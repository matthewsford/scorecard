import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {PlayerEditComponent} from './player-edit';
import {PageNotFoundComponent} from './page-not-found';
import {RegistrationPageComponent} from './registration-page';
import {LoginPageComponent} from './account/login-page';
import {AppShellComponent} from './app-shell/app-shell.component';
import {PlayerEditGuard} from './player-edit.guard';
import {DashboardComponent} from './dashboard';
import {PlayerTableComponent} from './player-table';
import {PlayerResolver} from './player.resolve';
import {PlayerService} from './player.service';
import {LeaderboardsTableComponent} from './leaderboards-table/leaderboards-table.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';

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
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'leaderboards',
                component: LeaderboardsTableComponent,
            },
            {
                path: 'leaderboards/:id',
                component: LeaderboardComponent,
            },
            {
                path: 'players',
                component: PlayerTableComponent,
            },
            {
                path: 'players/:id',
                component: PlayerEditComponent,
                canDeactivate: [PlayerEditGuard],
                resolve: {
                    player: PlayerResolver
                }
            },
            {
                path: '',
                redirectTo: '/dashboard',
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
    ],
    providers: [
        PlayerService,
        PlayerResolver,
    ],
})
export class AppRoutingModule {
}
