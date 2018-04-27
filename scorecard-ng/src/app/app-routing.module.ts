import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, PreloadAllModules, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';

import {PlayerEditComponent} from './player-edit';
import {HomeComponent} from './home';
import {PageNotFoundComponent} from './page-not-found';
import {RegistrationPageComponent} from './registration-page';
import {LoginPageComponent} from './login-page';
import {AppShellComponent} from './app-shell/app-shell.component';
import {PlayerEditGuard} from './player-edit.guard';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';

export class Player {
    name: string;
}

export class PlayerResolver implements Resolve<Player> {
    constructor(private http: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player> | Promise<Player> | Player {
        const id = route.paramMap.get('id');
        return this.http.get(`/api/players/${id}`);
    }

}

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegistrationPageComponent,
    },
    {
        path: '',
        component: AppShellComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'player',
                component: PlayerEditComponent,
                canDeactivate: PlayerEditGuard,
                resolve: {player: PlayerResolver}
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {path: '**', component: PageNotFoundComponent},
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true,
                preloadingStrategy: PreloadAllModules,
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
