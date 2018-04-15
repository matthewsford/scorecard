import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {LogUpdateService} from './log-update.service';
import {MadeWithLoveComponent} from './made-with-love.components';

@NgModule({
    imports: [
        CommonModule,
        SharedRoutingModule
    ],
    declarations: [
        MadeWithLoveComponent
    ],
    providers: [
        LogUpdateService
    ],
    entryComponents: [
        MadeWithLoveComponent
    ]
})
export class SharedModule {
}
