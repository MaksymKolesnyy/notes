// Global Query Selector
const noteContainer = document.querySelector('.note-container');
const modalContainer = document.querySelector('.modal-container');
const form = document.querySelector('form');

// Class: for creating a new note
class Note {
    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id = Math.random();
    }
}

//// LOCAL STORAGE ////

// Function: Retrieve notes from Local storage
function getNotes() {
    let notes;
    if (localStorage.getItem('noteApp.notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('noteApp.notes'));
    }
    return notes;
}

// Function: Add a note to local storage
function addNoteToLocalStorage(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem('noteApp.notes', JSON.stringify(notes));
}

// Function: Remove a note from local storage
function removeNote(id) {
    const notes = getNotes();
    notes.forEach((note, index) => { // Corretto l'uso di forEach
        if (note.id === id) {
            notes.splice(index, 1);
        }
    });
    localStorage.setItem('noteApp.notes', JSON.stringify(notes)); // Corretto il posizionamento dell'aggiornamento di localStorage
}

//// UI UPDATES ////

// Function: Create new note in UI
function addNoteToList(note) {
    const newUINote = document.createElement('div');
    newUINote.classList.add('note');
    newUINote.innerHTML = ` 
        <span hidden>${note.id}</span>
        <h2 class="note-title">${note.title}</h2>
        <p class="note-body">${note.body}</p>
        <div class="note-btns">
            <button class="note-btn note-view">View</button>
            <button class="note-btn note-delete">Delete</button>
        </div>
    `;
    noteContainer.appendChild(newUINote);
}

// Function: Show notes in UI
function displayNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        addNoteToList(note);
    });
}

// Function: Show alert message
function showAlertMessage(message, alertClass) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement('beforebegin', alertDiv);
    setTimeout(() => alertDiv.remove(), 4000);
}

// Function: View note in Modal
function activeNoteModal(title, body) {
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalContainer.classList.add('active');
}

// Event: Close Modal
document.querySelector('.modal-btn').addEventListener('click', () => {
    modalContainer.classList.remove('active');
});

// Event: Note buttons
noteContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('note-view')) {
        const currentNote = e.target.closest('.note');
        const currentTitle = currentNote.querySelector('.note-title').textContent;
        const currentBody = currentNote.querySelector('.note-body').textContent;
        activeNoteModal(currentTitle, currentBody);
    }
    if (e.target.classList.contains('note-delete')) {
        const currentNote = e.target.closest('.note');
        const noteId = parseFloat(currentNote.querySelector('span').textContent);
        currentNote.remove();
        removeNote(noteId); // Usa la funzione corretta
        showAlertMessage('Your note was permanently deleted.', 'remove-message');
    }
});

// Event: Display Notes
document.addEventListener('DOMContentLoaded', displayNotes); // Correzione dell'evento DOMContentLoaded

// Event: Note Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.querySelector('#title');
    const noteInput = document.querySelector('#note');

    // Validate inputs
    if (titleInput.value.length > 0 && noteInput.value.length > 0) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        addNoteToLocalStorage(newNote);
        titleInput.value = '';
        noteInput.value = '';
        showAlertMessage('Note successfully added!', 'success-message');
        titleInput.focus();
    } else {
        showAlertMessage('Please add both a title and a note.', 'alert-message');
    }
});
