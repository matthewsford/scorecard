import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {PlayerService} from '../player.service';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';

import {Player} from '../player';
import {CanLoseData} from '../can-lose-data.guard';

@Component({
    selector: 'app-player-edit',
    templateUrl: './player-edit.component.html',
    styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit, CanLoseData {
    private player: Player;
    formGroup: FormGroup;

    submit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder,
                private playerService: PlayerService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.player = this.route.snapshot.data['player'];
        this.createForm();
    }

    createForm() {
        this.formGroup = this.fb.group({
            name: this.player.name,
        });

        this.submit.pipe(
            tap(() => {
                // this.store.dispatch([new SetUsername(this.name)]);
            }))
            .subscribe();
    }

    get name(): string {
        return this.formGroup.get('name').value;
    }

    set name(value: string) {
        this.formGroup.get('name').setValue(value);
    }

    get isDirty(): boolean {
        return this.formGroup.dirty;
    }

    get resourceDescription(): string {
        return this.name || '(new player)';
    }
}
