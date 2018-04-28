
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTableComponent } from './games-table.component';

describe('GamesTableComponent', () => {
  let component: GamesTableComponent;
  let fixture: ComponentFixture<GamesTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
