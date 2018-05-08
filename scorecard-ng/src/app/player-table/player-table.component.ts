import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { PlayerTableDataSource } from './player-table-datasource';
import {PlayerService} from '../player.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PlayerTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private playerService: PlayerService,
              private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new PlayerTableDataSource(this.paginator, this.sort, this.playerService);
    /*this.dataSource.unauthorized.subscribe(() => {
      this.router.navigateByUrl('/sign-in?return-url=/players')
        .then(() => {
          // TODO: How should I respond?
        });
    });*/
  }
}
