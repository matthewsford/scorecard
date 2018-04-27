export class SetUsername {
    static readonly type = '[app] set username';

    constructor(private payload: string) {}
}