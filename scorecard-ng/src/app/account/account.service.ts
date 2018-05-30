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

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Meta} from '@angular/platform-browser';
import {from} from 'rxjs';

export enum SignInResult {
    Succeeded,
    InvalidCredentials,
    ServiceUnavailable,
    UnexpectedError,
}

export enum SignOutResult {
    Succeeded,
    ServiceUnavailable,
    UnexpectedError,
}

@Injectable()
export class AccountService {
    private readonly apiBase: string;

    constructor(
        private http: HttpClient,
        private meta: Meta) {
        // TODO: inject apiBase
      // rel="http://www.w3.org/ns/hydra/core#apiDocumentation"/
        this.apiBase = this.meta.getTag('itemprop="api:base"').getAttribute('content');
    }

    register(username: string, password: string): Observable<SignOutResult> {
        return this.http.post(
            `${this.apiBase}/accounts/register`,
            {
                email: username,
            })
            .pipe(
                map<any, SignOutResult>(() => SignOutResult.Succeeded),
                catchError<SignOutResult, SignOutResult>(
                    (error: HttpErrorResponse, caught: Observable<SignOutResult>): ArrayLike<SignOutResult> => {
                        if (error.status >= 500) {
                            return [SignOutResult.ServiceUnavailable];
                        } else {
                            return [SignOutResult.UnexpectedError];
                        }
                    }));
    }

    signIn(username: string, password: string, rememberMe: boolean): Observable<SignInResult> {
        return this.http.post(
            `${this.apiBase}/accounts/sign-in`,
            {
                email: username,
                key: '',
                rememberMe: rememberMe,
            })
            .pipe(
                map<any, SignInResult>(() => SignInResult.Succeeded),
                catchError<SignInResult, SignInResult>(
                    (error: HttpErrorResponse, caught: Observable<SignInResult>):
                    ArrayLike<SignInResult> => {
                        if (error.status === 401) {
                            return [SignInResult.InvalidCredentials];
                        } else if (error.status >= 500) {
                            return [SignInResult.ServiceUnavailable];
                        } else {
                            return [SignInResult.UnexpectedError];
                        }
                    })
            );
    }

    signOut() {
        return this.http.post(`${this.apiBase}/accounts/sign-out`, {});
    }
}
