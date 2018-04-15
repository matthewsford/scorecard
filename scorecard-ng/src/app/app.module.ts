import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ServiceWorkerModule} from '@angular/service-worker';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';

import {AppComponent} from './app.component';
import {PlayerEditComponent} from './player-edit';
import {PageNotFoundComponent} from './page-not-found';
import {HomeComponent} from './home';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import {environment} from '../environments/environment';
import {counterReducer} from './counter';

const reducers = {
    count: counterReducer,
    router: routerReducer
};

@NgModule({
    declarations: [
        AppComponent,
        PlayerEditComponent,
        PageNotFoundComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        CoreModule,
        AppRoutingModule,
        SharedModule,
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
