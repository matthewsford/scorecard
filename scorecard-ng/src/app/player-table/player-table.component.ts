import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

import {ResourceService} from '../resource.service';
import {Player} from '../player';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // dataSource: PlayerTableDataSource;
players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private playerService: ResourceService<Player>,
              private router: Router) {
  }

  ngOnInit() {
    this.playerService.getResources()
        .subscribe(this.players);
    // this.dataSource = new PlayerTableDataSource(this.paginator, this.sort, this.playerService);
    /*this.dataSource.unauthorized.subscribe(() => {
      this.router.navigateByUrl('/sign-in?return-url=/players')
        .then(() => {
          // TODO: How should I respond?
        });
    });*/
  }
}
