function typingText() {
	const textOriginalElem = document.querySelector('.about-me__content-text');
	if (textOriginalElem === null) {
		return;
	}

	const textTypingElem = textOriginalElem.cloneNode(true);
	const textField = textTypingElem.firstElementChild;
	const cursor = textTypingElem.lastElementChild;
	const text = textField.textContent;

	let index = 260;
	const delay = 90;

	textField.textContent = text.slice(0, index);
	textTypingElem.classList.remove('placeholder');
	textOriginalElem.before(textTypingElem);

	function type() {
		if (index < text.length) {
			textField.textContent += text[index++];

			setTimeout(type, Math.max(4, Math.floor(delay * Math.random())));
		} else {
			cursor.classList.add('blink');
		}
	}
	
	type();
}

export { typingText };