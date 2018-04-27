import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

class Player {
}

@Injectable()
export class PlayerService {
    constructor(private http: HttpClient) {
    }

    getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>('/api/players');
    }
}
