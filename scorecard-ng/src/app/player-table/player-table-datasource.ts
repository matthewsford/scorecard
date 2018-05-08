import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {multicast, tap} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Player} from '../player';
import {PlayerService} from '../player.service';

export enum ServerStatus {
    Okay,
    Unauthorized,
    Forbidden,
}

/**
 * Data source for the PlayerTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PlayerTableDataSource extends DataSource<Player> {

    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private playerService: PlayerService) {
        super();
    }

    serverStatus$: Observable<ServerStatus>;

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Player[]> {

        const dataMutations$ = merge(
            this.paginator.page,
            this.sort.sortChange,
            of(null),
        );

        /*
        const obs = this.playerService
          .getPlayers()
          .pipe(
            tap(players => {
                this.paginator.length = players.length;
                console.log(`SAW ${players.length} players`);
              },
              error => {
                if (error.status === 401) {
                  this.unauthorized.emit(null);
                } else if (error.status === 403) {
                  this.forbidden.emit(null);
                }
              }),
            switchMap(players => dataMutations$.pipe(
              map(() => this.getPagedData(this.getSortedData([...players])))
            )));
    */
        const multicast$ = this.playerService
            .getPlayers()
            .pipe(
                tap(players => {
                    this.paginator.length = players.length;
                    console.log(`SAW ${players.length} players`);
                }),
                multicast(() => new Subject()));


        return multicast$;
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() {
    }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: Player[]): Player[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: Player[]): Player[] {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'name':
                    return compare(a.name, b.name, isAsc);
                case 'id':
                    return compare(a.id, b.id, isAsc);
                default:
                    return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
