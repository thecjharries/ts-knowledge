// Things like ...be.true; or ...be.rejected; dont play nice with TSLint
/* tslint:disable:no-unused-expression */
import * as chai from "chai";
import * as sinon from "sinon";

// I personally use should.
// const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
/* tslint:disable-next-line:no-var-requires */
chai.use(require("chai-as-promised"));

import { TestableClass } from "../src/TestableClass";

describe("Testable class", () => {
    let testableClass: TestableClass | null;

    beforeEach(() => {
        testableClass = new TestableClass();
    });

    describe("returnFortySeven()", () => {
        it("should return 47", () => {
            const fortySeven: number = testableClass!.returnFortySeven();
            fortySeven.should.equal(47);
            fortySeven.should.be.a("number");
        });

    });

    describe("promiseToReturnFortySeven()", () => {
        describe("with vanilla chai", () => {
            it("should fulfill with 47", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                promisedFortySeven.should.be.a("Promise");
                return promisedFortySeven
                    .then((result: number) => {
                        result.should.equal(47);
                    });
            });
        });

        describe("with chai-as-promised", () => {
            it("should fulfill with 47", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return promisedFortySeven.should.eventually.equal(47);
            });
        });

        describe("with a Sinon spy", () => {
            let returnFortySevenSpy: sinon.SinonSpy;

            beforeEach(() => {
                returnFortySevenSpy = sinon.spy(testableClass, "returnFortySeven");
            });

            it("should fulfill with 47", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return Promise.all([
                    promisedFortySeven.should.eventually.equal(47),
                    returnFortySevenSpy.calledOnce.should.be.true,
                ]);
            });

            afterEach(() => {
                returnFortySevenSpy.restore();
            });
        });

        describe("with a Sinon stub", () => {
            let returnFortySevenStub: sinon.SinonStub;

            beforeEach(() => {
                returnFortySevenStub = sinon.stub(testableClass, "returnFortySeven").returns(48);
            });

            it("should fulfill with 48", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return Promise.all([
                    promisedFortySeven.should.eventually.equal(48),
                    returnFortySevenStub.calledOnce.should.be.true,
                ]);
            });

            afterEach(() => {
                returnFortySevenStub.restore();
            });
        });

        describe("with a Sinon mock", () => {
            let returnFortySevenMock: sinon.SinonMock;

            beforeEach(() => {
                returnFortySevenMock = sinon.mock(testableClass);
                returnFortySevenMock.expects("returnFortySeven").once().returns(47);
            });

            it("should fulfill with the return of returnFortySeven", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return Promise.all([
                    promisedFortySeven.should.eventually.equal(47),
                    returnFortySevenMock.verify(),
                ]);
            });

            afterEach(() => {
                returnFortySevenMock.restore();
            });
        });
    });

    afterEach(() => {
        testableClass = null;
    });
});
