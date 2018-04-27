import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
    }
}
