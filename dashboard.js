let notes = JSON.parse(localStorage.getItem("patientNotes")) || [];
const notesList = document.getElementById("notesList");
const noteInput = document.getElementById("noteInput");

function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === "") return;

  notes.push(noteText);
  saveNotes();
  renderNotes();
  noteInput.value = "";
}

function deleteNote(index) {
  if (confirm("Delete this note?")) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
}

function saveNotes() {
  localStorage.setItem("patientNotes", JSON.stringify(notes));
}

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="note-text">${note}</div>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(li);
  });
}

renderNotes();
