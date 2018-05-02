import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    formGroup: FormGroup;

    constructor(private fb: FormBuilder,
                private accountService: AccountService) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.formGroup = this.fb.group({
            username: '',
            password: '',
            rememberMe: false,
        });
    }

    onLogin() {
        const players = this.accountService.login(this.username, this.password)
            .subscribe((a) => {
            });
    }

    get username(): string {
        return this.formGroup.get('username').value;
    }

    set username(value: string) {
        this.formGroup.get('username').setValue(value);
    }

    get password(): string {
        return this.formGroup.get('password').value;
    }

    set password(value: string) {
        this.formGroup.get('password').setValue(value);
    }

    get rememberMe(): boolean {
        return this.formGroup.get('rememberMe').value;
    }

    set rememberMe(value: boolean) {
        this.formGroup.get('rememberMe').setValue(value);
    }
}
