import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {PlayerEditComponent} from './player-edit';
import {AuthService} from './auth.service';

export interface CanLoseData {
    isDirty: boolean;
    resourceDescription: string;
}

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated();
    }
}
