import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {ResourceService} from './resource.service';
import {Resource} from './resource';

@Injectable()
export class ResourceResolver<T extends Resource> implements Resolve<T> {
    constructor(private service: ResourceService<T>) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<T> {
        const id = route.paramMap.get('id');
        if (id === 'new') {
            const resource = new T();
            resource.id = 'new';
            return resource;
        } else {
            return this.service.getResource(id);
        }
    }
}
