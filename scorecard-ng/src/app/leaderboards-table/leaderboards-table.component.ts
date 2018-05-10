import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-leaderboards-table',
  templateUrl: './leaderboards-table.component.html',
  styleUrls: ['./leaderboards-table.component.css']
})
export class LeaderboardsTableComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
  }
}
