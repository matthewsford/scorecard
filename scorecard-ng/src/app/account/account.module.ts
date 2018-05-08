import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in';
import {ForgotPasswordComponent} from './forgot-password';
import {SharedModule} from '../shared';
import {AccountRoutingModule} from './account-routing.module';
import {RegisterComponent} from './register';
import {AccountService} from './account.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        ForgotPasswordComponent,
        RegisterComponent,
        SignInComponent,
    ],
    providers: [
        AccountService,
    ],
})
export class AccountModule {
}
