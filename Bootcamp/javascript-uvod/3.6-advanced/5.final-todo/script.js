// 🎯 Dohvaćamo elemente iz DOM-a
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// 📌 Dodavanje Event Listener-a na gumb "Add Task"
addTaskButton.addEventListener("click", function () {
    // 1️⃣ Dohvaćanje vrijednosti iz inputa
    const taskValue = taskInput.value.trim();

    // 2️⃣ Provjera je li unos prazan
    if (taskValue !== "") {
        addTask(taskValue);
        taskInput.value = ""; // Čišćenje input polja
    }
});

// 🔄 Callback funkcija za dodavanje zadatka
function addTask(task) {
    // ➡️ Kreiraj "li" element
    const li = document.createElement("li");
    li.textContent = task;

    // ➡️ Kreiraj gumb za brisanje
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    li.appendChild(deleteButton);

    // 🎯 Dodaj Event Listener za "klik" na zadatak
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // 🎯 Dodaj Event Listener za "klik" na delete gumb
    deleteButton.addEventListener("click", function (e) {
        e.stopPropagation(); // Sprječava "li" event da se pokrene
        taskList.removeChild(li);
    });

    // ➡️ Dodaj zadatak u listu
    taskList.appendChild(li);
}
