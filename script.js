var entryText = document.getElementById("entryText");
var moodSelect = document.getElementById("moodSelect");
var saveBtn = document.getElementById("saveBtn");
var entriesList = document.getElementById("entriesList");

var journalEntries = JSON.parse(localStorage.getItem("journalData")) || [];

saveBtn.addEventListener("click", function () {
    var text = entryText.value.trim();
    var mood = moodSelect.value;

    if (text === "") {
        alert("Please write something!");
        return;
    }

    var today = new Date();
    var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

    var entry = {
        date: date,
        text: text,
        mood: mood
    };

    journalEntries.push(entry);
    localStorage.setItem("journalData", JSON.stringify(journalEntries));

    entryText.value = "";
    renderEntries();
});

function deleteEntry(index) {
    journalEntries.splice(index, 1);
    localStorage.setItem("journalData", JSON.stringify(journalEntries));
    renderEntries();
}

function renderEntries() {
    entriesList.innerHTML = "";

    journalEntries.forEach(function (entry, i) {
        var div = document.createElement("div");
        div.classList.add("entry");

        div.innerHTML =
            "<strong>" +
            entry.date +
            " - " +
            entry.mood +
            "</strong>" +
            "<p>" +
            entry.text +
            "</p>" +
            "<button class='delete-btn' onclick='deleteEntry(" +
            i +
            ")'>Delete</button>";

        entriesList.appendChild(div);
    });
}

renderEntries();
