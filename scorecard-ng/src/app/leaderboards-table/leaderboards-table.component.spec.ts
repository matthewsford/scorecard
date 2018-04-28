
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardsTableComponent } from './leaderboards-table.component';

describe('LeaderboardsTableComponent', () => {
  let component: LeaderboardsTableComponent;
  let fixture: ComponentFixture<LeaderboardsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
