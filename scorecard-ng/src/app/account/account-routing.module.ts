import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password';
import {LoginPageComponent} from './login-page';
import {RegistrationPageComponent} from './registration-page';

const routes: Routes = [
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
];

@NgModule({
    imports: [
        RouterModule.forChild(
            routes,
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ],
})
export class AccountRoutingModule {
}
