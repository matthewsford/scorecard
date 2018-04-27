import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {PlayerEditComponent} from './player-edit';

@Injectable()
export class PlayerEditGuard implements CanDeactivate<PlayerEditComponent> {
    canDeactivate(component: PlayerEditComponent,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        if (component.isDirty) {
            const title = component.name || '(new player)';
            return confirm(`Lose all changes to ${title}`);
        }
    }
}
