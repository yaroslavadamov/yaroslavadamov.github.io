function trailerDialog() {
	const watchTrailerButtonElemList = document.querySelectorAll('.button-trailer');
	if (watchTrailerButtonElemList.length == 0) {
		return;
	}

	const trailerDialogElem = document.querySelector('#trailer-dialog');
	if (trailerDialogElem === null) {
		return;
	}

	const trailerVideoElem = trailerDialogElem.firstElementChild;


	// Open trailer
	watchTrailerButtonElemList.forEach((buttonElem) => {
		buttonElem.addEventListener('click', () => {
			trailerDialogElem.showModal();
			trailerVideoElem.play();
		});
	});

	// Close trailer
	trailerDialogElem.addEventListener('cancel', () => {
		trailerVideoElem.pause();
	});
}

export { trailerDialog };