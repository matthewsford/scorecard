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

import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operators';

import {DISABLED, INVALID, PENDING, VALID} from '@angular/forms/esm2015/src/model';

import {AccountService, SignInResult} from '../account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  errorMessage = '';
  capsLockOn$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  passwordInputType$: Subject<string> = new BehaviorSubject<string>('password');
  signInDisabled$: Subject<boolean> = new BehaviorSubject<boolean>(true);
  @ViewChild(FormGroupDirective) fgd: FormGroupDirective;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute) {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.showPasswordControl.valueChanges
      .subscribe(checked => this.passwordInputType$.next(checked ? 'text' : 'password'));

    this.fgd.ngSubmit.subscribe(() => {
      this.accountService.signIn(this.username, this.password, this.rememberMe)
        .subscribe((result: SignInResult) => {
          switch (result) {
            case SignInResult.Succeeded:
              this.navigateToReturnUrl();
              break;
            case SignInResult.InvalidCredentials:
              this.errorMessage = 'Username and/or password are invalid. Please try again.';
              break;
            case SignInResult.ServiceUnavailable:
              this.errorMessage = 'Service is unavailable. Please try again later.';
              break;
            case SignInResult.UnexpectedError:
              this.errorMessage = 'Something unexpected happened.';
              break;
            default:
              this.errorMessage = 'Something unexpected happened.';
          }
        });
    });
  }

  navigateToReturnUrl() {
    this.route.queryParamMap.subscribe(queryParamMap => {
      const returnUrl = queryParamMap.has('return-url') ? queryParamMap.get('return-url') : '/';
      this.router.navigateByUrl(returnUrl)
        .then(() => {
          // TODO: What should I do?
        });
    });
  }

  get showPasswordControl(): AbstractControl {
    return this.formGroup.get('showPassword');
  }

  get username(): string {
    return this.formGroup.get('username').value;
  }

  get password(): string {
    return this.formGroup.get('password').value;
  }

  get rememberMe(): boolean {
    return this.formGroup.get('rememberMe').value;
  }

  ngOnInit() {
  }

  createForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      showPassword: [false],
      rememberMe: [false],
    });
    this.formGroup.statusChanges
      .pipe(map(status => status === PENDING || status === INVALID))
      .subscribe(this.signInDisabled$);
  }

  onKeyPress(event: KeyboardEvent): void {
    this.capsLockOn$.next(event.getModifierState('CapsLock'));
  }
}
