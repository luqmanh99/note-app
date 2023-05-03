window.addEventListener('load', () => {
	notes = JSON.parse(localStorage.getItem('notes')) || [];
	const nameInput = document.querySelector('#name');
	const newNoteForm = document.querySelector('#new-note-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newNoteForm.addEventListener('submit', e => {
		e.preventDefault();

		const note = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		notes.push(note);

		localStorage.setItem('notes', JSON.stringify(notes));

		
		e.target.reset();

		DisplayNotes()
	})

	DisplayNotes()
})

function DisplayNotes () {
	const yourNote = document.querySelector('#your-note');
	yourNote.innerHTML = "";

	notes.forEach(note => {
		const noteItem = document.createElement('div');
		noteItem.classList.add('note-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = note.done;
		span.classList.add('bubble');
		if (note.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('kerja');
		}
		content.classList.add('note-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${note.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		noteItem.appendChild(label);
		noteItem.appendChild(content);
		noteItem.appendChild(actions);

		yourNote.appendChild(noteItem);

		if (note.done) {
			noteItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			note.done = e.target.checked;
			localStorage.setItem('notes', JSON.stringify(notes));

			if (note.done) {
				noteItem.classList.add('done');
			} else {
				noteItem.classList.remove('done');
			}

			DisplayNotes()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				note.content = e.target.value;
				localStorage.setItem('notes', JSON.stringify(notes));
				DisplayNotes()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			notes = notes.filter(t => t != note);
			localStorage.setItem('notes', JSON.stringify(notes));
			DisplayNotes()
		})

	})
}


