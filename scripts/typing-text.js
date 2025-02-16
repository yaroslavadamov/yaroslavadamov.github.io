const textOriginalElem = document.querySelector('.about-me__content-text');
const textTypingElem = textOriginalElem.cloneNode(true);

const textField = textTypingElem.firstElementChild;
const cursor = textTypingElem.lastElementChild;

let index = 260;

const text = textField.textContent;
textField.textContent = text.slice(0, index);

textTypingElem.classList.remove('placeholder');
textOriginalElem.before(textTypingElem);

const delay = 90;

function type() {
	if (index < text.length) {
		textField.textContent += text[index++];

		setTimeout(type, Math.max(4, Math.floor(delay * Math.random())));
	} else {
		cursor.classList.add('blink');
	}
}

type();