import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginPageComponent} from './login-page';
import {RegistrationPageComponent} from './registration-page';


const accountRoutes: Routes = [
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
      accountRoutes,
    )
  ],
  exports: [
    RouterModule,
  ],
  providers: [
  ],
})
export class AccountRoutingModule {
}
