import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    authenticationForm: FormGroup;

    constructor(private fb: FormBuilder,
                private accountService: AccountService) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.authenticationForm = this.fb.group({
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
        return this.authenticationForm.get('username').value;
    }

    set username(value: string) {
        this.authenticationForm.get('username').setValue(value);
    }

    get password(): string {
        return this.authenticationForm.get('password').value;
    }

    set password(value: string) {
        this.authenticationForm.get('password').setValue(value);
    }

    get rememberMe(): boolean {
        return this.authenticationForm.get('rememberMe').value;
    }

    set rememberMe(value: boolean) {
        this.authenticationForm.get('rememberMe').setValue(value);
    }
}
