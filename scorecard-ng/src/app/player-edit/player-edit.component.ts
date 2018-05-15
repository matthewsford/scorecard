import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';

import {Player} from '../player';
import {ResourceService} from '../resource.service';
import {CanLoseData} from '../can-lose-data.guard';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit, CanLoseData {
  private data$: Observable<Data>;
  formGroup: FormGroup;
  saveDisabled$: Observable<boolean>;

  constructor(private fb: FormBuilder,
              private playerService: ResourceService<Player>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.data$ = this.route.data;
    this.createForm();
  }

  createForm() {
    this.data$.subscribe(data => {
      const player = data['player'];
      if (player instanceof Player) {
        this.formGroup = this.fb.group({
          id: [player.id],
          name: [player.name, Validators.required],
        });
        this.saveDisabled$ = this.formGroup.valueChanges.pipe(map(() => this.formGroup.invalid || this.formGroup.pristine));
      }
    });

  }

  onSave() {
    this.playerService.saveResource({
      id: this.id,
      name: this.name,
    })
        .subscribe((value) => {
            this.formGroup.markAsPristine();
          this.router.navigateByUrl('/players')
              .then(val => {
                // TODO: What should I do?
              });
        });
  }

  get id(): string {
    return this.formGroup.get('id').value;
  }

  get resourceDescription(): string {
    return this.name || '(new player)';
  }

  get name(): string {
    return this.formGroup.get('name').value;
  }

  get isDirty(): boolean {
    return this.formGroup.dirty;
  }
}
