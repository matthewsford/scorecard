import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {LogUpdateService} from './log-update.service';

@NgModule({
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    declarations: [],
    providers: [
        LogUpdateService
    ]
})
export class SharedModule {
}
