import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Player} from './player';

@Injectable()
export class PlayerService {
    constructor(private http: HttpClient) {
    }

    public createPlayer(player: Player): Observable<Player> {
        return this.http.post<Player>('/api/players', player);
    }

    public getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>('/api/players');
    }

    public getPlayer(id: string): Observable<Player> {
        return this.http.get<Player>(`/api/players/${id}`);
    }

    public updatePlayer(player: Player): Observable<Player> {
        return this.http.patch<Player>(`/api/players/${player.id}`, player);
    }

    public deletePlayer(id: string): Observable<Player> {
        return this.http.delete<Player>(`/api/players/${id}`);
    }
}
