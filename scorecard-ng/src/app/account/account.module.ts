import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in';
import {SharedModule} from '../shared';
import {AccountRoutingModule} from './account-routing.module';
import {AccountService} from './account.service';
import {ClarityModule} from '@clr/angular';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        SharedModule,
        AccountRoutingModule
    ],
    declarations: [
        SignInComponent,
    ],
    providers: [
        AccountService,
    ],
})
export class AccountModule {
}
