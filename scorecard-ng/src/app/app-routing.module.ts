import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PlayerEditComponent} from './player-edit';
import {HomeComponent} from './home';
import {PageNotFoundComponent} from './page-not-found';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'player',
        component: PlayerEditComponent,
    },
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
