import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private loading$: Observable<boolean>;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router) {

        this.loading$ = router.events
            .pipe(
                filter(e => e instanceof NavigationStart ||
                    e instanceof NavigationCancel ||
                    e instanceof NavigationEnd ||
                    e instanceof NavigationError),
                map(e => e instanceof NavigationStart));
    }
}
