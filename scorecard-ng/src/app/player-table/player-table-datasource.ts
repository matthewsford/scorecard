import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {Player} from '../player';
import {PlayerService} from '../player.service';

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

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Player[]> {
        const playersSub = this.playerService.getPlayers()
            .subscribe(players => {

            });

        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            playersSub,
            this.paginator.page,
            this.sort.sortChange
        ];

        // Set the paginators length
        this.paginator.length = players.length;

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData(playersSub));
        }));
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
    private getPagedData(data$: Observable<Player[]>): Observable<Player[]> {
        return data$.map(data => {
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
        });
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data$: Observable<Player[]>): Observable<Player[]> {
        return data$.map(data => {
            if (!this.sort.active || this.sort.direction === '') {
                return data;
            }

            return data.sort((a, b) => {
                const isAsc = this.sort.direction === 'asc';
                switch (this.sort.active) {
                    case 'name':
                        return compare(a.name, b.name, isAsc);
                    case 'id':
                        return compare(+a.id, +b.id, isAsc);
                    default:
                        return 0;
                }
            });
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
