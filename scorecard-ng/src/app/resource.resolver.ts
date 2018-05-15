import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {ResourceService} from './resource.service';
import {Resource} from './resource';
import {Player} from './player';

@Injectable({
  providedIn: 'root',
})
export class ResourceResolver<T extends Resource> implements Resolve<T> {
  constructor(private service: ResourceService<T>) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<T> {
    const id = route.paramMap.get('id');
    return this.service.getResource(id);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlayerResolver extends ResourceResolver<Player> {

}
