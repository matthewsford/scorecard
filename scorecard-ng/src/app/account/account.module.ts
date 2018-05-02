import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SharedModule} from '../shared';
import {AccountRoutingModule} from './account-routing.module';
import {RegistrationPageComponent} from './registration-page';
import {AccountService} from './account.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        ForgotPasswordComponent,
        LoginPageComponent,
        RegistrationPageComponent,
    ],
    providers: [
        AccountService,
    ],
})
export class AccountModule {
}
