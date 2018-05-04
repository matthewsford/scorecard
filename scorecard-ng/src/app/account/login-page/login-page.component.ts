import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../account.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute) {
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
    this.accountService.login(this.username, this.password)
      .subscribe(() => {
        this.route.queryParamMap.subscribe(queryParamMap => {
          const returnUrl = queryParamMap.has('return-url') ? queryParamMap.get('return-url') : '/';
          this.router.navigateByUrl(returnUrl)
            .then(() => {
              // TODO: What should I do?
            });
        });
        },
        () => {
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
