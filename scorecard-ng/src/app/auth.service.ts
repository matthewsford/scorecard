import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable(
    // {
    // providedIn: 'root'
// }
)
export class AuthService {

    constructor() {
    }

    isAuthenticated(): Observable<boolean> {
        return of(true);
    }
}
