// Things like ...be.true; or ...be.rejected; dont play nice with TSLint
/* tslint:disable:no-unused-expression */

import * as chai from "chai";
import * as sinon from "sinon";

// I personally use should.
const expect = chai.expect;
const should = chai.should();
/* tslint:disable-next-line:no-var-requires */
chai.use(require("chai-as-promised"));

import { TestableClass } from "../src/TestableClass";

// Describe a single class
describe("Testable class", () => {
    let testableClass: TestableClass | null;

    // Create new instance of TestableClass each run
    beforeEach(() => {
        testableClass = new TestableClass();
    });

    // Describe the tests for a single method
    describe("returnFortySeven()", () => {
        // It only does one thing
        it("should return 47", () => {
            const fortySeven: number = testableClass!.returnFortySeven();
            // Redundant assertions aren't necessarily bad
            fortySeven.should.equal(47);
            fortySeven.should.be.a("number");
        });
    });

    // Describe the tests for another method
    describe("promiseToReturnFortySeven()", () => {
        // Nest into some other condition
        describe("with vanilla chai", () => {
            // Vanilla chai assertions have to run after the promise is fulfilled
            it("should fulfill with 47", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                promisedFortySeven.should.be.a("Promise");
                return promisedFortySeven
                    .then((result: number) => {
                        result.should.equal(47);
                    });
            });
        });

        // chai-as-promised handles the promise for you
        describe("with chai-as-promised", () => {
            it("should fulfill with 47", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return promisedFortySeven.should.eventually.equal(47);
            });
        });

        describe("with a Sinon spy", () => {
            // Declare the spy in the outer context
            let returnFortySevenSpy: sinon.SinonSpy;

            // Rebuild the spy each test
            beforeEach(() => {
                returnFortySevenSpy = sinon.spy(testableClass, "returnFortySeven");
            });

            // Ensure the spy was called
            it("should fulfill with 47", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return Promise.all([
                    promisedFortySeven.should.eventually.equal(47),
                    returnFortySevenSpy.calledOnce.should.be.true,
                ]);
            });

            // Return the spy to its original method
            afterEach(() => {
                returnFortySevenSpy.restore();
            });
        });

        describe("with a Sinon stub", () => {
            // Declare the stub in the outer context
            let returnFortySevenStub: sinon.SinonStub;

            // Rebuild the stub each test
            // Change the behavior of the stub
            beforeEach(() => {
                returnFortySevenStub = sinon.stub(testableClass, "returnFortySeven");
                returnFortySevenStub.returns(48);
            });

            // Ensure the stub was called
            it("should fulfill with 48", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return Promise.all([
                    promisedFortySeven.should.eventually.equal(48),
                    returnFortySevenStub.calledOnce.should.be.true,
                ]);
            });

            // Return the stub to its original method
            afterEach(() => {
                returnFortySevenStub.restore();
            });
        });

        describe("with a Sinon mock", () => {
            // Declare the mock in the outer context
            let returnFortySevenMock: sinon.SinonMock;

            // Rebuild the mock each test
            beforeEach(() => {
                returnFortySevenMock = sinon.mock(testableClass);
                returnFortySevenMock.expects("returnFortySeven").once().returns(47);
            });

            // Ensure the mock was called
            it("should fulfill with the return of returnFortySeven", () => {
                const promisedFortySeven: Promise<number> = testableClass!.promiseToReturnFortySeven();
                return Promise.all([
                    promisedFortySeven.should.eventually.equal(47),
                    returnFortySevenMock.verify(),
                ]);
            });

            // Return the mock to its original method
            afterEach(() => {
                returnFortySevenMock.restore();
            });
        });
    });

    // Wipe testableClass after each class
    afterEach(() => {
        testableClass = null;
    });
});
