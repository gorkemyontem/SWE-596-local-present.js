function CourseController() {
    this.course = course(); // Ex: SWE, CMPE
    this.tableOfContent = this.getToC();
    this._rawLessons = this.extractAllLessons();
    this._presentations = this.createPresentations(); // map <key, paths linkedlist>
    this.syllabus = this.createSyllabus(); // linkedlist
    this.currentConcept = this.syllabus.head;
    this.lastConcept = this.currentConcept;
    this.currentPages = this.currentConcept.value.pages;
    this.currentSlide = this.currentPages.head;
}

CourseController.prototype.getToC = function(){
    return this.course.arrConcept.map(el => lessonNameExtracter(el));
}

CourseController.prototype.createSyllabus = function(){
    return initLinkedListFromMap(this._presentations);
}

CourseController.prototype.findPage = function(page){
    let concept = this.syllabus.head;
    let i = 0;
    while (i < 10) {
        i++;
        if(concept.value.pages.search(page) != null){
            console.log(concept);
            this.currentConcept = concept;
            this.currentPages = this.currentConcept.value.pages;
            this.currentSlide = this.currentConcept.value.pages.search(page);
            return this.currentSlide.value;
        }
        concept = this.syllabus.next(concept)
    }
}

CourseController.prototype.extractAllLessons = function(){
    let lessons = new Map();
    this.tableOfContent.forEach(el => lessons.set(el, getPagesOfLesson(el)));
    return lessons;
}

CourseController.prototype.createPresentations = function(){
    let lessons = new Map();
    this._rawLessons.forEach((val, key) => {
        let paths = recursiveFlatter(val);
        paths = addFolderName(paths);
        let presentation = initLinkedList(paths);
        lessons.set(key, presentation);
    })

    return lessons;
}

CourseController.prototype.nextPage = function(){
    if(!this.currentPages.isEnd(this.currentSlide)){
        return this.getNextSlide();
    } else {
        return this.getSlideFromBegining();
    }
}

CourseController.prototype.getNextSlide = function(){
    this.currentSlide = this.currentSlide.next;
    return this.currentSlide.value;
}

CourseController.prototype.backToPage = function(){
    return this.getPage(this.lastConcept.value.conceptName)
}

CourseController.prototype.goToPage = function(concept){
    return this.getPage(concept)
}

CourseController.prototype.getPage = function(concept){
    var foundNode =  this.syllabus.searchByConceptName(concept);
    this.lastConcept = this.currentConcept;
    this.currentConcept = foundNode;
    this.currentPages = this.currentConcept.value.pages;
    this.currentSlide = this.currentPages.head;
    return this.currentSlide.value;
}

CourseController.prototype.prevPage = function(){
    if(!this.currentPages.isStart(this.currentSlide)){
        return this.getPrevSlide();
    } else {
        return this.getSlideFromEnd();
    }
}

CourseController.prototype.getPrevSlide = function(){
    this.currentSlide = this.currentSlide.prev;
    return this.currentSlide.value;
}

CourseController.prototype.getSlideFromBegining = function(){
    if(this.syllabus.isEnd(this.currentConcept)){
        return 'end.html';
    }
    this.currentConcept = this.currentConcept.next;
    this.currentPages = this.currentConcept.value.pages;
    this.currentSlide = this.currentPages.head;
    return this.currentSlide.value;
}

CourseController.prototype.getSlideFromEnd = function(){
    if(this.syllabus.isStart(this.currentConcept)){
        return 'begin.html';
    }
    this.currentConcept = this.currentConcept.prev;
    this.currentPages = this.currentConcept.value.pages;
    this.currentSlide = this.currentPages.tail;
    return this.currentSlide.value;
}

// UTILS
function initLinkedList(nodes){
    var linkedList = new LinkedList();
    nodes.forEach(node => linkedList.addToTail(node));
    return linkedList;
}

function initLinkedListFromMap(nodes){
    var linkedList = new LinkedList();
    nodes.forEach((value, key) => linkedList.addToTail({ conceptName: key, pages: value}));
    return linkedList;
}

function getPagesOfLesson(lessonName){
    var lesson = {}
    try {
        lesson = eval(lessonName)()
    } catch(e) {
        console.error("Lesson is not defined");
    }
    return lesson.arrPage;
}

function lessonNameExtracter(name){
    if(this.isStartingWithStar(name)) {
        return name.substr(1);
    }
    return name;
}

function isStartingWithStar(text){
    return text.charAt(0) == "*";
}

function recursiveFlatter(paths){
    return paths.map(el => {
        if(isStartingWithStar(el)) {
            let newName = lessonNameExtracter(el);
            let pts =  getPagesOfLesson(newName);
            return recursiveFlatter(pts)
        } else {
            return el;
        }
    }).flat();
}

function addFolderName(paths){
    return paths.map(el => ("courseA" + "/" + el));
}
