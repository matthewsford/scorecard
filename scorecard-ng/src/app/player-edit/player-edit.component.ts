import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PlayerService} from '../player.service';
import {Select, Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';

import {Player} from '../player';
import {SetUsername} from '../shared/app.actions';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {
  private player: Player;
  form: FormGroup;

  @Select() app$;

  constructor(private fb: FormBuilder,
              private playerService: PlayerService,
              private route: ActivatedRoute,
              private store: Store,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.player = this.route.snapshot.data['player'];
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: this.player.name,
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
    return this.form.get('name').value;
  }

  set name(value: string) {
    this.form.get('name').setValue(value);
  }

  get isDirty(): boolean {
    return this.form.dirty;
  }
}
