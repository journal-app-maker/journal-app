var journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

var entriesList = document.getElementById("entriesList");
var moodChartCanvas = document.getElementById("moodChart");
var moodChartInstance = null;

function saveEntry() {
    var text = document.getElementById("entryText").value.trim();
    var mood = document.getElementById("mood").value;

    if (!text) {
        alert("Please write something!");
        return;
    }

    var entry = {
        date: new Date().toLocaleDateString(),
        text: text,
        mood: mood
    };

    journalEntries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));

    document.getElementById("entryText").value = "";

    renderEntries();
    renderMoodChart();
}

function renderEntries() {
    entriesList.innerHTML = "";
    journalEntries.slice().reverse().forEach(function(entry) {
        var div = document.createElement("div");
        div.classList.add("entry");
        div.innerHTML = "<strong>" + entry.date + " - " + entry.mood + "</strong><p>" + entry.text + "</p>";
        entriesList.appendChild(div);
    });
}

function renderMoodChart() {
    var moodCount = { happy: 0, neutral: 0, sad: 0, angry: 0 };
    var last7 = journalEntries.slice(-7);

    last7.forEach(function(entry) {
        if (moodCount[entry.mood] !== undefined) {
            moodCount[entry.mood]++;
        }
    });

    if (moodChartInstance) {
        moodChartInstance.destroy();
    }

    moodChartInstance = new Chart(moodChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Happy', 'Neutral', 'Sad', 'Angry'],
            datasets: [{
                label: 'Mood Count (Last 7 Entries)',
                data: [moodCount.happy, moodCount.neutral, moodCount.sad, moodCount.angry],
                backgroundColor: ['#FFD700', '#A9A9A9', '#1E90FF', '#FF4500']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, precision: 0 }
            }
        }
    });
}

renderEntries();
renderMoodChart();
