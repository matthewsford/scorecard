import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-player-edit',
    templateUrl: './player-edit.component.html',
    styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {
    playerForm: FormGroup;

    constructor(private fb: FormBuilder) { // <--- inject FormBuilder
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.playerForm = this.fb.group({
            name: '', // <--- the FormControl called "name"
        });
    }

    onSave() {
        console.log(`name: ${this.name}`);
    }

    get name(): string {
        return this.playerForm.get('name').value;
    }

    set name(value: string) {
        this.playerForm.get('name').setValue(value);
    }
}
