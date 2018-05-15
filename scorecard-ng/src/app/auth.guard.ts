import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';

export interface CanLoseData {
  isDirty: boolean;
  resourceDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // TODO
    // return this.authService.isAuthenticated();
    return true;
  }
}
