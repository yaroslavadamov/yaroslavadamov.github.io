function lockScroll(lock) {
	if (lock) {
		const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollBarWidth}px`;
	} else {
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
	}
	
}

function mobileOverlay() {
	const burgerButtonElem = document.querySelector('.header__burger-button');
	const mobileOverlayElem = document.querySelector('.mobile-overlay-container');
	const mobileOverlayLinkElems = document.querySelectorAll('.mobile-overlay__menu-link');

	if (burgerButtonElem === null || mobileOverlayElem === null) {
		return;
	}

	// Open mobile-overlay
	burgerButtonElem.addEventListener('click', () => {
		lockScroll(true);
		mobileOverlayElem.style.visibility = "visible";
		mobileOverlayElem.classList.add('is-open');
	});

	// Close mobile-overlay
	function closeMobileOverlay() {
		lockScroll(false);
		const timeoutDelay = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--color-mode-transition-duration')) * 2 * 1000;
		setTimeout(() => {
			if (!mobileOverlayElem.classList.contains('is-open')) {
				mobileOverlayElem.style.visibility = "";
			}
		}, timeoutDelay);
		mobileOverlayElem.classList.remove('is-open');
	}

	mobileOverlayLinkElems.forEach((link) => {
		link.addEventListener('click', closeMobileOverlay);
	});

	mobileOverlayElem.addEventListener('click', function(event) {
		if (event.target == this) {
			closeMobileOverlay();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === "Escape") {
			closeMobileOverlay();
		}
	});
}

export { mobileOverlay };