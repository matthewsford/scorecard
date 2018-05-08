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

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {DISABLED, INVALID, PENDING, VALID} from '@angular/forms/esm2015/src/model';
import {BehaviorSubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {AccountService} from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup;
  capsLockOn$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  passwordInputType$: Subject<string> = new BehaviorSubject<string>('password');
  submitDisabled$: Subject<boolean> = new BehaviorSubject<boolean>(true);
  @ViewChild(FormGroupDirective) fgd: FormGroupDirective;

  constructor(private fb: FormBuilder,
              private accountService: AccountService) {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.showPasswordControl.valueChanges
      .subscribe(checked => this.passwordInputType$.next(checked ? 'text' : 'password'));

    this.fgd.ngSubmit.subscribe(() => {
      this.accountService.register(this.username, this.password);
    });
  }

  get showPasswordControl(): AbstractControl {
    return this.formGroup.get('showPassword');
  }

  get password(): string {
    return this.formGroup.get('password').value;
  }

  get username(): string {
    return this.formGroup.get('username').value;
  }

  ngOnInit() {
  }

  createForm() {
    console.log('creating form');
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required], // mustMatch(this.passwordControl, 'confirm password must match password')]],
      showPassword: [false],
    });
    /*
    this.formGroup.statusChanges
      .pipe(map(status => status === PENDING || status === INVALID))
      .subscribe(this.submitDisabled$);
      */
  }

  get passwordControl(): AbstractControl {
    return this.formGroup.get('password');
  }

  get confirmPassword(): string {
    return this.formGroup.get('confirmPassword').value;
  }

  set confirmPassword(value: string) {
    this.formGroup.get('confirmPassword').setValue(value);
  }
}

export function mustMatch(targetControl: AbstractControl, error: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    return control.value === targetControl.value ? {'error': {value: control.value}} : null;
  };
}
