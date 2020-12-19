// Pun Intended
function Testify() {
    this.consoleSuccessStyle = "color: #4BB543; text-shadow: 0px -1px #4BB543";
    this.consoleDangerStyle = "color: #dc3545; text-shadow: 0px -1px #dc3545";
    this.consoleWarningStyle = "color: #ffc107; text-shadow: 0px -1px #ffc107";
    this.testCounter = 0;
    this.successCounter = 0;
}

Testify.prototype.runTests = function (arr) {
    arr.forEach(func => func());
    this.printResult();
}
/* ASSERT METHODS */

Testify.prototype.assert = function (nameOfMethod, a, operator, b) {
    this.testCounter++;
    switch (operator) {
        case "==":
            this.assertEqual(nameOfMethod, a, b);
            break;
        case "!=":
            this.assertNotEqual(nameOfMethod, a, b);
            break;
        case ">":
            this.assertGreater(nameOfMethod, a, b);
            break;
        case "<":
            this.assertLess(nameOfMethod, a, b);
            break;
        default:
            break;
    }
}

Testify.prototype.assertEqual = function (nameOfMethod, a, b) {
    let errorMsg = `Error on ${nameOfMethod} test method: ${a} not equal to ${b}.`
    console.assert(a === b, { a, b, errorMsg: errorMsg });

    if (a === b) {
        this.logSuccessful(nameOfMethod);
    }
}

Testify.prototype.assertNotEqual = function (nameOfMethod, a, b) {
    let errorMsg = `Error on ${nameOfMethod} test method: ${a} equal to ${b}.`
    console.assert(a !== b, { a, b, errorMsg: errorMsg });
    if (a !== b) {
        this.logSuccessful(nameOfMethod);
    }
}

Testify.prototype.assertGreater = function (nameOfMethod, a, b) {
    let errorMsg = `Error on ${nameOfMethod} test method: ${a} less or equal than ${b}.`
    console.assert(a > b, { a, b, errorMsg: errorMsg });
    if (a > b) {
        this.logSuccessful(nameOfMethod);
    }
}

Testify.prototype.assertLess = function (nameOfMethod, a, b) {
    let errorMsg = `Error on ${nameOfMethod} test method: ${a} greater or equal than ${b}.`
    console.assert(a < b, { a, b, errorMsg: errorMsg });

    if (a < b) {
        this.logSuccessful(nameOfMethod);
    }
}

Testify.prototype.logSuccessful = function (nameOfMethod) {
    this.successCounter++;
    console.log(`%c✔︎ ${nameOfMethod} is successful`, this.consoleSuccessStyle);
}

Testify.prototype.printResult = function () {
    if (this.testCounter == this.successCounter){
        console.log("%c═══════════════════════════════════════════", this.consoleSuccessStyle);
        console.log(`%c✔︎✔︎✔︎ ${this.successCounter}/${this.testCounter} - All Tests Are Successful ✔︎✔︎✔︎`, this.consoleSuccessStyle);
        console.log("%c═══════════════════════════════════════════", this.consoleSuccessStyle);
    } else if (0 == this.successCounter){
        console.log("%c═════════════════════════════════", this.consoleDangerStyle);
        console.log(`%c✖✖✖ ${this.successCounter}/${this.testCounter} - All Tests FAILED ✖✖✖`, this.consoleDangerStyle);
        console.log("%c═════════════════════════════════", this.consoleDangerStyle);
    } else {
        console.log("%c══════════════════════════════════════════", this.consoleWarningStyle);
        console.log(`%c⚠⚠⚠ ${this.successCounter}/${this.testCounter} - Some of the tests failed ⚠⚠⚠`, this.consoleWarningStyle);
        console.log("%c══════════════════════════════════════════", this.consoleWarningStyle);
    }
}
