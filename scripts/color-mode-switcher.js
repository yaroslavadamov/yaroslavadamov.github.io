function colorModeSwitcher() {
	const checkbox = document.querySelector('#color-mode-switcher');
	const checkboxBody = document.querySelector('.color-mode-switcher__body');
	if (checkbox === null || checkboxBody === null) {
		return;
	}
	const checkboxBodySun = checkboxBody.querySelector('.color-mode-switcher__body-sun');
	const checkboxBodyMoon = checkboxBody.querySelector('.color-mode-switcher__body-moon');

	if (getComputedStyle(document.documentElement).colorScheme == 'light') {
		document.documentElement.classList.add('light-mode');
		checkboxBodyMoon?.classList.add('invert-color');
	} else {
		document.documentElement.classList.add('dark-mode');
		checkbox.checked = true;
		checkboxBody.classList.add('is-active');
		checkboxBodySun?.classList.add('invert-color');
	}

	checkbox.onchange = () => {
		document.documentElement.classList.toggle('light-mode');
		document.documentElement.classList.toggle('dark-mode');
		checkboxBody.classList.toggle('is-active');
		checkboxBodySun?.classList.toggle('invert-color');
		checkboxBodyMoon?.classList.toggle('invert-color');
	};
}

export { colorModeSwitcher };