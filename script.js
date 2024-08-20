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

// Function: Add a note to local storage

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

// Function: View note in Modal
function activeNoteModal(title, body) {  // Modifica: Aggiunta di 'function'
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
});

// Event: Note Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.querySelector('#title');
    const noteInput = document.querySelector('#note');

    // Validate inputs
    if (titleInput.value.length > 0 && noteInput.value.length > 0) {
        const newNote = new Note(titleInput.value, noteInput.value);
        addNoteToList(newNote);
        titleInput.value = '';
        noteInput.value = '';
        titleInput.focus();
    }
});
