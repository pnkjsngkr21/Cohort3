let count = 3

function deleteTodo(index) {
    console.log(index);
    const element = document.getElementById("todo-" + index);
    element.parentNode.removeChild(element);
}


function addTodo() {
    const index = count++;
    const inputEl = document.getElementById("inp");
    const divNode = document.createElement("div");
    const h4Node = document.createElement("h4");
    const bNode = document.createElement("button");
    const parentEl = document.getElementById("todos");

    parentEl.appendChild(divNode);
    divNode.appendChild(h4Node);
    divNode.appendChild(bNode);


    divNode.id = "todo-"+index;
    console.log(index)
    h4Node.innerText = inputEl.value;
    bNode.innerText = "delete";
    bNode.setAttribute("onclick", "deleteTodo(" + index + ")");
    inputEl.value = "";
}

