// ======================================
// SELECT ELEMENTS
// ======================================

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const previewBadge = document.getElementById("previewBadge");

const addTask = document.getElementById("addTask");

const characters = document.getElementById("characters");

const todo = document.getElementById("todo");

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("progressCount");
const doneCount = document.getElementById("doneCount");

// ======================================
// CHARACTER COUNTDOWN
// ======================================

taskInput.addEventListener("input", function () {

    let left = 60 - taskInput.value.length;

    characters.textContent = left + " Characters Left";

});

// ======================================
// PRIORITY PREVIEW
// ======================================

priority.addEventListener("change", function () {

    previewBadge.textContent = priority.value;

    previewBadge.className = "";

    if(priority.value === "High"){

        previewBadge.classList.add("high");

    }

    else if(priority.value === "Medium"){

        previewBadge.classList.add("medium");

    }

    else{

        previewBadge.classList.add("low");

    }

});

// ======================================
// UPDATE COUNTS
// ======================================

function updateCounts(){

    todoCount.textContent =
    todo.children.length;

    progressCount.textContent =
    progress.children.length;

    doneCount.textContent =
    done.children.length;

    checkBadge(todoCount);

    checkBadge(progressCount);

    checkBadge(doneCount);

}

// ======================================
// RED BADGE IF >5
// ======================================

function checkBadge(badge){

    if(Number(badge.textContent) > 5){

        badge.classList.add("danger");

    }

    else{

        badge.classList.remove("danger");

    }

}

// ======================================
// CREATE TASK
// ======================================

function createTask(title, level){

    const card =
    document.createElement("div");

    card.className = "task";

    card.draggable = true;

    const heading =
    document.createElement("h3");

    heading.textContent = title;

    const badge =
    document.createElement("span");

    badge.className = "badge";

    badge.textContent = level;

    if(level === "High"){

        badge.classList.add("high");

    }

    else if(level === "Medium"){

        badge.classList.add("medium");

    }

    else{

        badge.classList.add("low");

    }

    card.appendChild(heading);

    card.appendChild(badge);

    todo.appendChild(card);

    updateCounts();

}

// ======================================
// ADD TASK
// ======================================

addTask.addEventListener("click", function(){

    let title =
    taskInput.value.trim();

    if(title === ""){

        alert("Please enter a task.");

        return;

    }

    createTask(title, priority.value);

    taskInput.value = "";

    characters.textContent =
    "60 Characters Left";

    taskInput.focus();

});

// ======================================
// INITIAL COUNT
// ======================================

updateCounts();

// ======================================
// DRAG & DROP
// ======================================

let draggedTask = null;

document.addEventListener("dragstart", function(event){

    if(event.target.classList.contains("task")){

        draggedTask = event.target;

    }

});

const columns = document.querySelectorAll(".task-list");

columns.forEach(function(column){

    column.addEventListener("dragover", function(event){

        event.preventDefault();

        column.classList.add("drag-over");

    });

    column.addEventListener("dragleave", function(){

        column.classList.remove("drag-over");

    });

    column.addEventListener("drop", function(){

        column.classList.remove("drag-over");

        if(draggedTask){

            column.appendChild(draggedTask);

            updateCounts();

            saveBoard();

        }

    });

});

// ======================================
// DELETE TASK
// ======================================

document.addEventListener("dblclick", function(event){

    if(event.target.classList.contains("task")){

        if(confirm("Delete this task?")){

            event.target.remove();

        }

    }

    else if(event.target.parentElement.classList.contains("task")){

        if(confirm("Delete this task?")){

            event.target.parentElement.remove();

        }

    }

    updateCounts();

    saveBoard();

});

// ======================================
// SAVE BOARD
// ======================================

function saveBoard(){

    let board = {

        todo: todo.innerHTML,

        progress: document.getElementById("progress").innerHTML,

        done: document.getElementById("done").innerHTML

    };

    localStorage.setItem(

        "kanbanBoard",

        JSON.stringify(board)

    );

}

// ======================================
// LOAD BOARD
// ======================================

function loadBoard(){

    let board =

    JSON.parse(localStorage.getItem("kanbanBoard"));

    if(board){

        todo.innerHTML = board.todo;

        document.getElementById("progress").innerHTML =
        board.progress;

        document.getElementById("done").innerHTML =
        board.done;

    }

    updateCounts();

}

// ======================================
// SAVE AFTER ADDING TASK
// ======================================

const originalCreateTask = createTask;

createTask = function(title, level){

    originalCreateTask(title, level);

    saveBoard();

};

// ======================================
// THEME TOGGLE
// ======================================

const themeBtn =
document.getElementById("themeBtn");

if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light");

    themeBtn.textContent =
    "☀ Light Mode";

}

themeBtn.addEventListener("click",function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeBtn.textContent =
        "☀ Light Mode";

        localStorage.setItem("theme","light");

    }

    else{

        themeBtn.textContent =
        "🌙 Dark Mode";

        localStorage.setItem("theme","dark");

    }

});

// ======================================
// CLEAR BOARD
// ======================================

document.getElementById("clearBtn")

.addEventListener("click",function(){

    let answer = confirm(

        "Delete all tasks?"

    );

    if(answer){

        todo.innerHTML="";

        document.getElementById("progress").innerHTML="";

        document.getElementById("done").innerHTML="";

        updateCounts();

        saveBoard();

    }

});

// ======================================
// DOM CONTENT LOADED
// ======================================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadBoard();

    }

);