# SWE-596 local-present.js

## Features
1. Prev & Next Button
1. Arrow Keys handling (<kbd>&#8592;</kbd>, <kbd>&#8594;</kbd>)
1. Table of Content (<kbd>ESC</kbd>)
1. Back to the source (<kbd>Backspace</kbd>)
1. Hypertext Reference handling
1. Doubly Linked List approach


## Javascript

| File                 | Link                                                                                                         | Description |
|----------------------|--------------------------------------------------------------------------------------------------------------|-------------|
| courseStructure.js   | [link](https://github.com/gorkemyontem/SWE-596-local-present.js/blob/main/js/courseController.js)            | Provided By User. Contains file structure            |
| main.js              | [link](https://github.com/gorkemyontem/SWE-596-local-present.js/blob/main/js/main.js)                        | Main file, orchestrates everything             |
| courseController.js  | [link](https://github.com/gorkemyontem/SWE-596-local-present.js/blob/main/js/courseController.js)            | Turns course structure to nested doubly linked list and handles all of the page change actions. PrevPage, NextPage, Go To Page, Change concept etc.              |
| linkedList.js        | [link](https://github.com/gorkemyontem/SWE-596-local-present.js/blob/main/js/linkedList.js)                  | Doubly linked list implementation in JS              |
| renderer.js          | [link](https://github.com/gorkemyontem/SWE-596-local-present.js/blob/main/js/renderer.js)                    | Renders views and take cares of DOM changes            |
| historyController.js | [link](https://github.com/gorkemyontem/SWE-596-local-present.js/blob/main/js/historyController.js)           | Handles history change events             |

## Doubly Linked List Structure

![](/docs/linkedlist.png "Linked List")

## Screenshots
![](/docs/first-page.png "First Page")

![](/docs/second-page.png "Second Page")

![](/docs/toc-overlay.png "ToC Overlay Page")
