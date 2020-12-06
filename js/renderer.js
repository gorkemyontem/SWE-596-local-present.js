function Renderer() {
    this.iframe = document.createElement("iframe");
    this.mainDiv = document.getElementById("main-div");
    this.overlay = document.getElementById("overlay");
    this.toc = document.getElementById("toc");
    this.tocBtn = document.getElementById("tocBtn")
    this.backBtn = document.getElementById("backBtn")
    this.prevBtn = document.getElementById("prevBtn")
    this.nextBtn = document.getElementById("nextBtn")
    this.tocActive = false;
}

Renderer.prototype.resetMainDiv = function(){
    this.mainDiv.innerHTML = "";
}

Renderer.prototype.resetToc = function(){
    this.toc.innerHTML = "";
}

Renderer.prototype.setIframe = function(source){
    this.iframe.src = source;
}

Renderer.prototype.appendIframe = function() {
    this.mainDiv.appendChild(this.iframe);
}

Renderer.prototype.renderBackPage = function(iframeSrc){
    this.flashButton(this.backBtn);
    this.renderIframe(iframeSrc);
}

Renderer.prototype.renderPrevPage = function(iframeSrc){
    this.flashButton(this.prevBtn);
    this.renderIframe(iframeSrc);
}

Renderer.prototype.renderNextPage = function(iframeSrc){
    this.flashButton(this.nextBtn);
    this.renderIframe(iframeSrc);
}

Renderer.prototype.renderIframe = function(iframeSrc){
    this.resetMainDiv();
    this.setIframe(iframeSrc);
    this.appendIframe();
}

Renderer.prototype.renderTableOfContent = function(tableOfContent){
    this.resetToc();
    if(this.tocActive){
        this.hideOverlay();
        this.deactivateButton(this.tocBtn);
    } else {
        this.showOverlay();
        this.activateButton(this.tocBtn);
        for(let i = 0; i < tableOfContent.length; i++){
            let concept = tableOfContent[i];
            let li = this.createListItem(concept);
            this.toc.appendChild(li);
        }
    }
    this.toggleToc();
}

Renderer.prototype.toggleToc = function(){
    this.tocActive = !this.tocActive;
}

Renderer.prototype.hideOverlay = function(){
    this.overlay.classList.add("hidden");
}

Renderer.prototype.flashButton = function(el){
    this.activateButton(el);
    setTimeout(() => { this.deactivateButton(el); }, 200)
}

Renderer.prototype.activateButton = function(el){
    el.classList.add("active");
}

Renderer.prototype.deactivateButton = function(el){
    el.classList.remove("active");
}

Renderer.prototype.showOverlay = function(){
    this.overlay.classList.remove("hidden");
}

Renderer.prototype.renderConcept = function(iframeSrc) {
    this.hideOverlay();
    this.toggleToc();
    this.deactivateButton(this.tocBtn);
    this.renderIframe(iframeSrc);
}

Renderer.prototype.createListItem = function(innerText){
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerText = innerText;
    a.setAttribute("onclick", "renderConcept('" + innerText + "');");
    li.appendChild(a);
    return li;
}

// conceptA nin sayfasinin icinde a href 2.sayfa var. ona gidip geri gelebilmek
// ziple goster
