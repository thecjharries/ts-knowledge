export class TestableClass {
    public constructor() {
        // do nothing
    }

    public returnFortySeven(): number {
        return 47;
    }

    public promiseToReturnFortySeven(): Promise<number> {
        return Promise.resolve(this.returnFortySeven());
    }
}