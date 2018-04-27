import {Action, State, StateContext} from '@ngxs/store';
import {Router} from '@angular/router';

export class Navigate {
    static readonly type = '[router] navigate';

    constructor(public  payload: string) {
    }
}

@State<string>({
    name: 'router',
    defaults: ''
})
export class RouterState {
    constructor(private router: Router) {
    }

    @Action(Navigate)
    async changeRoute(context: StateContext<string>, action: Navigate) {
        const path = action.payload;
        await this.router.navigate([path]);
        context.setState(path);
    }
}
