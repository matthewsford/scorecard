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
import {Injector, NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {LayoutModule} from '@angular/cdk/layout';
import {createCustomElement} from '@angular/elements';
import {ClarityModule} from '@clr/angular';

import {AppComponent} from './app.component';
import {PlayerEditComponent} from './player-edit';
import {PageNotFoundComponent} from './page-not-found';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import {environment} from '../environments/environment';
import {AppShellComponent} from './app-shell/app-shell.component';
import {DashboardComponent} from './dashboard';
import {PlayerTableComponent} from './player-table';
import {GameEditComponent} from './game-edit/game-edit.component';
import {GamesTableComponent} from './games-table/games-table.component';
import {LeaderboardsTableComponent} from './leaderboards-table/leaderboards-table.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {AccountModule} from './account/account.module';
import {SignOutComponent} from './account/sign-out';

@NgModule({
  declarations: [
    AppComponent,
    PlayerEditComponent,
    PageNotFoundComponent,
    AppShellComponent,
    DashboardComponent,
    PlayerTableComponent,
    GameEditComponent,
    GamesTableComponent,
    LeaderboardsTableComponent,
    LeaderboardComponent,
    SignOutComponent,
  ],
  entryComponents: [
    PlayerEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,

    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule,
    AppRoutingModule,
    SharedModule,
    AccountModule,
    LayoutModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  // noinspection JSUnusedGlobalSymbols
  ngDoBootstrap() {
    const PlayerEditElement = createCustomElement(PlayerEditComponent, {injector: this.injector});
    customElements.define('player-edit', PlayerEditElement);
  }
}
