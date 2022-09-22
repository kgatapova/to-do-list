let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
taskList.forEach(task => load(task));
document.getElementById("add-task-button").addEventListener("click",
    function () {
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "delete-btn");
        const taskText = document.getElementById("input-task").value;
        document.getElementById("input-task").value = "";
        const spanTask = document.createElement("span");
        spanTask.setAttribute("class", "task");
        spanTask.textContent = taskText;
        const task = document.createElement("li");
        task.appendChild(input);
        task.appendChild(spanTask);
        task.appendChild(deleteBtn);
        document.getElementById("task-list").appendChild(task);
        jsonify();
        task.querySelector(".delete-btn").addEventListener("click", function () {
            task.remove();
            jsonify();
        })
        task.querySelector("input").addEventListener("click", function (){
            task.classList.toggle("done");
            jsonify();
        });
    });

document.querySelectorAll("li").forEach(li => {
    li.querySelector(".delete-btn").addEventListener("click", function() {
        li.remove();
        jsonify();
    });
    li.querySelector("input").addEventListener("click", function (){
        li.classList.toggle("done");
        jsonify();
    });
});

function jsonify() {
    let taskList = [];
    document.querySelectorAll("li").forEach(li => {
        let task = {};
        task.text = li.querySelector("span").textContent;
        task.ifDone = li.classList.contains("done");
        taskList.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function load(taskObj) {
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn");
    const spanTask = document.createElement("span");
    spanTask.setAttribute("class", "task");
    spanTask.textContent = taskObj.text;
    const task = document.createElement("li");
    task.appendChild(input);
    task.appendChild(spanTask);
    task.appendChild(deleteBtn);
    if(taskObj.ifDone) {
        task.setAttribute("class", "done");
        input.checked = true;
    }
    document.getElementById("task-list").appendChild(task);
}