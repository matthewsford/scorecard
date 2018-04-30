import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from './login-page';
import { ForgotPasswordComponent } from '../Account/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      LoginPageComponent,
      ForgotPasswordComponent,
  ]
})
export class AccountModule { }
