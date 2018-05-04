import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {PlayerService} from '../player.service';
import {ActivatedRoute, Data} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Player} from '../player';
import {CanLoseData} from '../can-lose-data.guard';

@Component({
    selector: 'player-edit',
    templateUrl: './player-edit.component.html',
    styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit, CanLoseData {
    private data$: Observable<Data>;
    formGroup: FormGroup;

    submit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder,
                private playerService: PlayerService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.data$ = this.route.data;
        this.createForm();
    }

    createForm() {
      this.data$.subscribe(data => {
        const player = data['player'];
        this.formGroup = this.fb.group({
          name: player.name,
        });
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
