import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import {Player} from './player';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  public savePlayer(player: Player): Observable<Player> {
    return player.id === 'new' ? this.createPlayer(player) : this.updatePlayer(player);
  }

  public createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>('/api/players', player);
  }

  public updatePlayer(player: Player): Observable<Player> {
    return this.http.patch<Player>(`/api/players/${player.id}`, player);
  }

  public getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>('/api/players');
  }

  public getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`/api/players/${id}`);
  }

  public deletePlayer(id: string): Observable<Player> {
    return this.http.delete<Player>(`/api/players/${id}`);
  }
}
