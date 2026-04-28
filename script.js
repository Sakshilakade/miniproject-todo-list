let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Quotes */
let quotes = [
    "Stay focused and never give up!",
    "Small steps lead to big success!",
    "You are capable of amazing things!",
    "Make today productive!",
];

document.getElementById("quote").innerText =
    quotes[Math.floor(Math.random() * quotes.length)];

/* Save */
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add Task */
function addTask() {
    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (text === "") return alert("Enter task!");

    tasks.push({ text, date, priority, done: false });

    save();
    display();

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

/* Delete */
function deleteTask(i) {
    tasks.splice(i, 1);
    save();
    display();
}

/* Toggle */
function toggleTask(i) {
    tasks[i].done = !tasks[i].done;
    save();
    display();
}

/* Edit Task */
function editTask(i) {
    let newText = prompt("Edit task:", tasks[i].text);
    if (newText) {
        tasks[i].text = newText;
        save();
        display();
    }
}

/* Search */
function searchTask() {
    let value = document.getElementById("search").value.toLowerCase();
    let all = document.querySelectorAll(".task");

    all.forEach(t => {
        t.style.display =
            t.innerText.toLowerCase().includes(value) ? "flex" : "none";
    });
}

/* Display */
function display() {
    let p = document.getElementById("pending");
    let c = document.getElementById("completed");

    p.innerHTML = "";
    c.innerHTML = "";

    let completedCount = 0;
    let today = new Date().toISOString().split("T")[0];

    tasks.forEach((t, i) => {
        let div = document.createElement("div");
        div.className = "task " + t.priority.toLowerCase();

        if (t.done) completedCount++;

        /* Overdue */
        if (t.date && t.date < today && !t.done) {
            div.classList.add("overdue");
        }

        div.innerHTML = `
            <span class="${t.done ? 'completed' : ''}">
                ${t.text} (${t.priority}) - ${t.date || "No date"}
            </span>
            <div>
                <button onclick="toggleTask(${i})">Completed Task✔</button>
                <button onclick="editTask(${i})">Edit Task✏️</button>
                <button onclick="deleteTask(${i})">Delete Task❌</button>
            </div>
        `;

        if (t.done) c.appendChild(div);
        else p.appendChild(div);
    });

    /* Stats */
    let total = tasks.length;
    let pending = total - completedCount;

    document.getElementById("stats").innerText =
        `Total: ${total} | Completed: ${completedCount} | Pending: ${pending}`;

    /* Progress */
    let percent = total === 0 ? 0 : Math.floor((completedCount / total) * 100);

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").innerText =
        percent + "% Completed";
}

display();