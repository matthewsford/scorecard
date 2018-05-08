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

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AccountService, SignOutResult} from '../account.service';

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

    constructor(
        private accountService: AccountService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.accountService.signOut().subscribe(
            (result: SignOutResult) => {
                switch (result) {
                    case SignOutResult.Succeeded:
                        this.router.navigateByUrl('/sign-in')
                            .then(() => {
                                // TODO: ?
                            });
                        break;
                    case SignOutResult.ServiceUnavailable:
                        break;
                    case SignOutResult.UnexpectedError:
                        break;
                    default:
                }
            }
        );
    }

}
