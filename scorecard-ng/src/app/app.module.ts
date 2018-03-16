import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule} from '@angular/material';

import {AppComponent} from './app.component';
import {PlayerEditComponent} from './player-edit';
import {PageNotFoundComponent} from './page-not-found';
import {HomeComponent} from './home';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core';
import {SharedModule} from './shared';

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
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CoreModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
