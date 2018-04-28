import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {Player} from './player';
import {PlayerService} from './player.service';

@Injectable()
export class PlayerResolver implements Resolve<Player> {
  constructor(private http: HttpClient) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<Player> | Promise<Player> | Player {
    const id = route.paramMap.get('id');
    return this.http.get<Player>(`/api/players/${id}`);
  }
}
