import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, of, Subject} from 'rxjs';

import {Player} from './player';
import {Resource} from './resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T extends Resource> {
  readonly urlFragment: string;

  constructor(private http: HttpClient) {
    this.urlFragment = ''; // `/api/${T.name.toLowerCase()}`;
  }

  public saveResource(resource: T): Observable<T> {
    return resource.id === 'new' ? this.createResource(resource) : this.updateResource(resource);
  }

  public createResource(resource: T): Observable<T> {
    return this.http.post<T>(this.urlFragment,
      // {...resource, id: null});
      resource);
  }

  public updateResource(resource: T): Observable<T> {
    return this.http.patch<T>(`${this.urlFragment}/${resource.id}`, resource);
  }

  public getResources(): Observable<T[]> {
    return this.http.get<T[]>(this.urlFragment);
  }

  public getResource(id: string): Observable<T> {
    if (id === 'new') {
      // const resource = new T();
      // resource.id = 'new';
      // return resource;
      return new Subject<T>();
    } else {
      return this.http.get<T>(`${this.urlFragment}/${id}`);
    }
  }

  public deleteResource(id: string): Observable<T> {
    return this.http.delete<T>(`${this.urlFragment}/${id}`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends ResourceService<Player> {

}
