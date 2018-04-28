import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { LeaderboardsTableDataSource } from './leaderboards-table-datasource';

@Component({
  selector: 'leaderboards-table',
  templateUrl: './leaderboards-table.component.html',
  styleUrls: ['./leaderboards-table.component.css']
})
export class LeaderboardsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: LeaderboardsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new LeaderboardsTableDataSource(this.paginator, this.sort);
  }
}
