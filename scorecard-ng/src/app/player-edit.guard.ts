import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {PlayerEditComponent} from './player-edit';
import {Observable} from 'rxjs/index';

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
