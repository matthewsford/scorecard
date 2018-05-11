import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-authorize',
    templateUrl: './authorize.component.html',
    styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {
    params = '';

    constructor(
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            const clientId = paramMap.has('client_id') ? paramMap.get('client_id') : '';

            this.params +=  `clientId: ${clientId}`;
        });
    }

}
