const courseController = new CourseController();
const historyController = new HistoryController();
const renderer = new Renderer();
init();

document.addEventListener('keydown', keyHandler);
window.onpopstate = stateHandler;

function init(){
    if (window.location.search) {
        let page = window.location.search.replace("?page=", "");
        renderer.renderIframe(page);

    } else {
        renderer.renderIframe(courseController.currentSlide.value);
    }
}
function renderPreviousPage() {
    let page = courseController.prevPage();
    renderer.renderPrevPage(page);
    historyController.setPage(page);
}

function renderNextPage() {
    let page = courseController.nextPage();
    renderer.renderNextPage(page);
    historyController.setPage(page);
}

function renderBack() {
    let page = courseController.backToPage();
    renderer.renderBackPage(page)
    historyController.setPage(page);
}

function renderTableOfContent() {
    const tableOfContent = courseController.tableOfContent;
    renderer.renderTableOfContent(tableOfContent);
}

function renderConcept(concept) {
    let page = courseController.goToPage(concept);
    renderer.renderConcept(page);
    historyController.setPage(page);
}

function keyHandler(event) {
    const callback = {
        "ArrowLeft": renderPreviousPage,
        "ArrowRight": renderNextPage,
        "Escape": renderTableOfContent,
        "Backspace": renderBack
    }[event.key];
    callback?.();
}

function stateHandler(event) {
    if (event && event.state && event.state.page) {
        let ans = historyController.whichDirection(event.state?.page);
        if (ans == "PREV") {
            renderer.renderPrevPage(event.state?.page);
        } else {
            renderer.renderNextPage(event.state?.page);
        }
    }
}
