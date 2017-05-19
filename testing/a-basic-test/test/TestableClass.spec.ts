// Things like ...be.true; or ...be.rejected; dont play nice with TSLint
/* tslint:disable:no-unused-expression */
import * as chai from "chai";
import * as sinon from "sinon";

// I personally use should.
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
/* tslint:disable-next-line:no-var-requires */
chai.use(require("chai-as-promised"));

import { TestableClass } from "../src/TestableClass"

describe("Testable class", () => {
    let 
});