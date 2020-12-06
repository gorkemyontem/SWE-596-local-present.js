function HistoryController() {
    this.currentState = history.state;
    this.states = [ { index: 0, page: history.state }];
    this.currentIndex = this.states.length - 1;
}

HistoryController.prototype.setPage = function(page){
    history.pushState({ page }, "Slide: " + page, "?page=" + page);
    this.states.push({ index: this.states.length, page });
    this.currentState = history.state;
    this.currentIndex = this.states.length - 1;
}

HistoryController.prototype.whichDirection = function(page){
        if(this.states[this.currentIndex - 1].page == page){
        this.currentState = history.state;
        this.currentIndex--;
        return "PREV";
    }
    this.currentState = history.state;
    this.currentIndex++;
    return "NEXT";
}
