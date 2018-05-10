import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {PlayerEditComponent} from './player-edit';

export interface CanLoseData {
    isDirty: boolean;
    resourceDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class CanLoseDataGuard implements CanDeactivate<CanLoseData> {
    canDeactivate(component: CanLoseData,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        if (component.isDirty) {
            return confirm(`Lose all changes to ${component.resourceDescription}`);
        }
        return true;
    }
}
