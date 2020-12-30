const testify = new Testify();
this.correctOrder = [
    'courseA/chA/secA/p1.html',
    'courseA/chA/secA/p2.html',
    'courseA/chA/secA/p3.html',

    'courseA/chA/secB/c1.html',
    'courseA/chA/secB/c2.html',
    'courseA/chA/secB/c3.html',

    'courseA/chB/secA/d1.html',
    'courseA/chB/secA/d2.html',
    'courseA/chB/secA/d3.html',

    'courseA/chA/secA/p1.html',
    'courseA/chB/secA/d1.html',
    'courseA/chA/secA/p2.html',

    'courseA/chA/secB/c1.html',
    'courseA/chA/secB/c2.html',
    'courseA/chA/secB/c3.html',
]

/* TEST METHODS */
const testFirstSlide = function () {
    this.courseController = new CourseController();
    testify.assert("testFirstSlide", this.courseController.currentSlide.value, "==", this.correctOrder[0]);
}

const testSecondSlide = function () {
    this.courseController = new CourseController();
    this.courseController.nextPage();
    testify.assert("testSecondSlide", this.courseController.currentSlide.value, "==", this.correctOrder[1]);
}

const testLoopSlide = function () {
    this.courseController = new CourseController();
    this.correctOrder.forEach((slide, index) => {
        testify.assert("testLoopSlide" + index, this.courseController.currentSlide.value, "==", slide);
        this.courseController.nextPage();
    });
}

const testLastSlide = function () {
    this.courseController = new CourseController();
    for (let i = 0; i < 100; i++) {
        this.courseController.nextPage();
    }
    testify.assert("testLastSlide", this.courseController.currentSlide.value, "==", this.correctOrder[this.correctOrder.length - 1]);
}

const testLastPrevSlide = function () {
    this.courseController = new CourseController();
    for (let i = 0; i < 100; i++) {
        this.courseController.nextPage();
    }
    this.courseController.prevPage();
    testify.assert("testLastPrevSlide", this.courseController.currentSlide.value, "==", this.correctOrder[this.correctOrder.length - 2]);
}

const testNegativeLastPrevSlide = function () {
    this.courseController = new CourseController();
    for (let i = 0; i < 100; i++) {
        this.courseController.nextPage();
    }
    this.courseController.prevPage();
    testify.assert("testNegativeLastPrevSlide", this.courseController.currentSlide.value, "!=", this.correctOrder[this.correctOrder.length - 1]);
}


const tests = [
            testFirstSlide,
            testSecondSlide,
            testLoopSlide,
            testLastSlide,
            testLastPrevSlide,
            testNegativeLastPrevSlide
        ];

testify.runTests(tests)
