export class TestableClass {
    public returnFortySeven(): number {
        return 47;
    }

    public promiseToReturnFortySeven(): Promise<number> {
        const self = this;
        return Promise.resolve(self.returnFortySeven());
    }
}
