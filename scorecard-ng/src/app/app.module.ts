/*
 *   Copyright 2018 Matthew Ford <matthew@matthewford.us>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {LayoutModule} from '@angular/cdk/layout';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

import {AppComponent} from './app.component';
import {PlayerEditComponent} from './player-edit';
import {PageNotFoundComponent} from './page-not-found';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import {environment} from '../environments/environment';
import {AppNavComponent} from './app-nav/app-nav.component';
import {AppShellComponent} from './app-shell/app-shell.component';
import {CanLoseDataGuard} from './can-lose-data.guard';
import {DashboardComponent} from './dashboard';
import {PlayerTableComponent} from './player-table';
import {GameEditComponent} from './game-edit/game-edit.component';
import {GamesTableComponent} from './games-table/games-table.component';
import {LeaderboardsTableComponent} from './leaderboards-table/leaderboards-table.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {AuthService} from './auth.service';
import {IsAuthenticatedGuard} from './auth.guard';
import {AccountModule} from './account/account.module';

@NgModule({
    declarations: [
        AppComponent,
        PlayerEditComponent,
        PageNotFoundComponent,
        AppNavComponent,
        AppShellComponent,
        DashboardComponent,
        PlayerTableComponent,
        GameEditComponent,
        GamesTableComponent,
        LeaderboardsTableComponent,
        LeaderboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        CoreModule,
        AppRoutingModule,
        SharedModule,
        AccountModule,
        LayoutModule,
    ],
    providers: [
        AuthService,
        CanLoseDataGuard,
        IsAuthenticatedGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}

