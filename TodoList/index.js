let todoContainer = document.getElementById("todoItemsContainer");
let buttonElement = document.getElementById("buttonId");
let saveButton = document.getElementById("saveBtn");

function getList() {
    let listElement = localStorage.getItem("todolist");
    let parsedListElement = JSON.parse(listElement);
    if (parsedListElement === null) {
        return [];
    }
    return parsedListElement;
}

let todoList = getList();


saveButton.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
}


function onClickRemoveItem(todoId) {
    let element = document.getElementById(todoId);
    todoContainer.removeChild(element);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function checkboxOnClick(labelId, checkboxId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let inputElement = document.getElementById(labelId);
    inputElement.classList.toggle("checked");
    let index = todoList.findIndex(function(eachItem) {
        let id = "todo" + eachItem.uniqueNo;
        if (todoId === id) {
            return true;
        } else {
            return false;
        }
    });
    let element = todoList[index];
    if (element.isChecked === true) {
        element.isChecked = false;
    } else {
        element.isChecked = true;
    }
}

function appendtodolist(todo) {
    let checkboxId = "checkBox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let listElement = document.createElement("li");
    listElement.id = todoId;
    listElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoContainer.appendChild(listElement);
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.classList.add("checkbox-input");
    inputElement.id = checkboxId;
    listElement.appendChild(inputElement);
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listElement.appendChild(labelContainer);
    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    inputElement.onclick = function() {
        checkboxOnClick(labelId, checkboxId, todoId);
    };
    labelElement.htmlFor = checkboxId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    labelContainer.appendChild(labelElement);
    let iconContainer = document.createElement("div");
    iconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(iconContainer);
    let iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-trash-alt", "delete-icon");
    iconElement.onclick = function() {
        onClickRemoveItem(todoId);
    };
    iconContainer.appendChild(iconElement);
}
for (let i of todoList) {
    appendtodolist(i);
}

function addTodoItem() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter valid text");
        return;
    }
    let todoCount = todoList.length;
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    appendtodolist(newTodo);
    userInputElement.value = "";
}


buttonElement.onclick = function() {
    addTodoItem();
}
