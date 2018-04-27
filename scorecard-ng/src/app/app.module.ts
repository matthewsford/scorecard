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
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
} from '@angular/material';
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
import {PlayerService} from './player.service';
import {LoginPageComponent} from './login-page';
import {RegistrationPageComponent} from './registration-page';
import {AccountService} from './account.service';
import {AppNavComponent} from './app-nav/app-nav.component';
import {AppShellComponent} from './app-shell/app-shell.component';
import {PlayerEditGuard} from './player-edit.guard';
import {AppState, RouterState} from './shared';
import {DashboardComponent} from './dashboard';
import {PlayerTableComponent} from './player-table';
import {PlayerResolver} from "./player.resolve";

@NgModule({
  declarations: [
    AppComponent,
    PlayerEditComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AppNavComponent,
    AppShellComponent,
    DashboardComponent,
    PlayerTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      AppState,
      RouterState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AccountService,
    PlayerEditGuard,
    PlayerResolver,
    PlayerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

