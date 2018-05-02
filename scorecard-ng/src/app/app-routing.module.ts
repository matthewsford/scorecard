import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {PlayerEditComponent} from './player-edit';
import {PageNotFoundComponent} from './page-not-found';
import {AppShellComponent} from './app-shell/app-shell.component';
import {CanLoseDataGuard} from './can-lose-data.guard';
import {DashboardComponent} from './dashboard';
import {PlayerTableComponent} from './player-table';
import {PlayerResolver} from './player.resolve';
import {PlayerService} from './player.service';
import {LeaderboardsTableComponent} from './leaderboards-table/leaderboards-table.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {IsAuthenticatedGuard} from './auth.guard';
import {LoginPageComponent} from './account/login-page';
import {ForgotPasswordComponent} from './account/forgot-password';
import {RegistrationPageComponent} from './account/registration-page';

const appRoutes: Routes = [
    /*
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
    },
    */
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
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
                canActivate: [IsAuthenticatedGuard],
            },
            {
                path: 'leaderboards',
                component: LeaderboardsTableComponent,
                canActivate: [IsAuthenticatedGuard],
            },
            {
                path: 'leaderboards/:id',
                component: LeaderboardComponent,
                canActivate: [IsAuthenticatedGuard],
            },
            {
                path: 'players',
                component: PlayerTableComponent,
                canActivate: [IsAuthenticatedGuard],
            },
            {
                path: 'players/:id',
                component: PlayerEditComponent,
                canActivate: [IsAuthenticatedGuard],
                canDeactivate: [CanLoseDataGuard],
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
