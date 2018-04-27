import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PlayerService} from '../player.service';
import {Observable} from 'rxjs/index';
import {Select, Store} from '@ngxs/store';
import {Route, Router} from '@angular/router';
import {Player} from '../app-routing.module';
import {SetUsername} from '../shared/app.actions';

@Component({
    selector: 'app-player-edit',
    templateUrl: './player-edit.component.html',
    styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {
    private player: Player;
    playerForm: FormGroup;

    @Select() app$;

    constructor(private fb: FormBuilder,
                private playerService: PlayerService,
                private route: Route,
                private store: Store) {
    }

    ngOnInit() {
        this.player = this.route.data['player'];
        this.createForm();
    }

    createForm() {
        this.playerForm = this.fb.group({
            name: this.player.name, // <--- the FormControl called "name"
        });
    }

    onSave() {
        console.log(`name: ${this.name}`);
        this.store.dispatch([new SetUsername(this.name)]);
        const players = this.playerService.getPlayers()
            .subscribe((a) => {
            });
    }

    get name(): string {
        return this.playerForm.get('name').value;
    }

    set name(value: string) {
        this.playerForm.get('name').setValue(value);
    }

    get isDirty(): boolean {
        return this.playerForm.dirty;
    }
}
