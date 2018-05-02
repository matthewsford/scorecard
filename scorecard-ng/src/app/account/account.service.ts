import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Meta} from '@angular/platform-browser';

@Injectable()
export class AccountService {
    private readonly apiBase: string;

    constructor(
        private http: HttpClient,
        private meta: Meta) {
        this.apiBase = this.meta.getTag('itemprop="api:base"').getAttribute('content');
    }


    register(username: string, password: string) {
        return this.getSalt(username)
            .pipe(
                map(salt => {
                    return this.http.post('/register', {username: username, password: password});
                })
            )
            .subscribe();
    }

    login(username: string, password: string) {

        return this.http.post('/api/login', {username: username, password: password});
    }

    getSalt(username: string): Observable<string> {
        return this.http.get<string>(`${this.apiBase}/accounts/salt/${username}`);
    }
}
