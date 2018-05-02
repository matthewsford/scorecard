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

import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../account.service';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
    registrationForm: FormGroup;
    register: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder,
                private accountService: AccountService) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.registrationForm = this.fb.group({
            username: '',
            password: '',
            confirmPassword: '',
        });
        this.register.subscribe(next => {
            this.accountService.register(this.username, this.password);
        });
    }

    get username(): string {
        return this.registrationForm.get('username').value;
    }

    set username(value: string) {
        this.registrationForm.get('username').setValue(value);
    }

    get password(): string {
        return this.registrationForm.get('password').value;
    }

    set password(value: string) {
        this.registrationForm.get('password').setValue(value);
    }

    get confirmPassword(): string {
        return this.registrationForm.get('confirmPassword').value;
    }

    set confirmPassword(value: string) {
        this.registrationForm.get('confirmPassword').setValue(value);
    }
}
