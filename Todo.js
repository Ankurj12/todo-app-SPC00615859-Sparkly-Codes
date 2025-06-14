let inputs = document.getElementById("inp");
let taskList = document.getElementById("task-list");
let counter = document.getElementById("counter");
let filterBtns = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  const activeCount = tasks.filter(task => !task.completed).length;
  counter.innerText = activeCount;
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    let taskItem = document.createElement("ul");
    taskItem.classList.toggle("completed", task.completed);

    let span = document.createElement("span");
    span.innerText = task.text;
    span.onclick = () => toggleTask(index);

    let delBtn = document.createElement("i");
    delBtn.className = "fa-solid fa-trash";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    taskItem.appendChild(span);
    taskItem.appendChild(delBtn);

    taskList.appendChild(taskItem);
  });

  updateCounter();
}

function addTask() {
  let text = inputs.value.trim();
  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text, completed: false });
  inputs.value = "";
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

inputs.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

renderTasks();
