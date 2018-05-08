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

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ForgotPasswordComponent} from './forgot-password';
import {SignInComponent} from './sign-in';
import {RegisterComponent} from './register';

const routes: Routes = [
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'sign-in',
        component: SignInComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
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
    declarations: [
    ],
    entryComponents: [
    ],
})
export class AccountRoutingModule {
}