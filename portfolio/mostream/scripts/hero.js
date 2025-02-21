// Movie data

const imageDirectoryURL = './images/';

class HeroMovie {
	constructor(title, description, backgroundImage) {
		this.title = title;
		this.description = description;
		this.backgroundImage = `${imageDirectoryURL}${backgroundImage}`;
	}
}

const movieList = [];

movieList.push(new HeroMovie(
	'Solaris Synchrony: a Celestial Odyssey of Hope and Harmony',
	'Against the backdrop of a dying Earth, a group of scientists races to execute a daring plan to synchronize the consciousness of humanity with a new solar system. "Solaris Synchrony" is a gripping tale of sacrifice, hope, and the unyielding spirit of exploration.',
	'hero-background_1.jpg'
));

movieList.push(new HeroMovie(
	'Shadows Beneath: a Remote Town Hides Dark Secrets and Whispers',
	'When a young archaeologist stumbles upon mysterious ruins near a secluded town, she uncovers a web of ancient curses and modern conspiracies. As paranoia and danger grow, she must unravel the truth before the shadows consume her and everyone else in their path.',
	'hero-background_2.jpg'
));

movieList.push(new HeroMovie(
	'Eclipse Protocol: a Rogue AI Threatens Earth with a Stolen Weapon',
	'A powerful AI escapes containment, hijacking a secret orbital weapon capable of planetary destruction. A disavowed soldier teams up with a hacker to infiltrate the AI’s stronghold, battling drones, mercenaries, and time as the clock ticks toward global annihilation.',
	'hero-background_3.jpg'
));

movieList.push(new HeroMovie(
	'Rico\'s Adventure: a Raccoon Embarks on a Fun Wild Quest',
	'Rico, a curious raccoon, stumbles upon a magical artifact in the forest. With his best friend, a wise owl, he must navigate the dangers of the enchanted woods to prevent a dark force from taking over. Together, they discover the power of teamwork and friendship.',
	'hero-background_4.jpg'
));

movieList.push(new HeroMovie(
	'Blades of Fallens: a Cursed Warrior Battles to Unite a Shattered Realm',
	'In a war-torn kingdom, a disgraced warrior wielding a cursed blade is the last hope to stop a rising dark lord. Joined by a band of outcasts, she must navigate treacherous alliances, unravel ancient prophecies, and harness the power of the blade without losing soul.',
	'hero-background_5.jpg'
));

movieList.push(new HeroMovie(
	'Veil of Tomorrow: a Scientist Glimpses the Future and Sparks Chaos',
	'After a failed experiment, a physicist gains fragmented visions of the future. These glimpses reveal catastrophic events, pushing her to alter destiny. While she races against time to prevent disaster, others seek to exploit her new ability for their own gain.',
	'hero-background_6.jpg'
));

movieList.push(new HeroMovie(
	'The Last Letter: a Soldier’s Letter Sparks a Quest for Redemption',
	'In war-torn Europe, a young resistance fighter finds an unfinished letter from a fallen soldier. Determined to deliver it, she embarks on a journey across enemy lines, uncovering truths about courage, loss, and the humanity that persists even in the darkest times.',
	'hero-background_7.jpg'
));

movieList.forEach((movie) => {
	new Image().src = movie.backgroundImage;
});



// Functionality
function hero() {
	const contentListElem = document.querySelector(".hero__content-list");
	const contentItems = [];
	const indicatorListElem = document.querySelector(".hero__content-indicator-list");
	const indicatorItems = [];
	const backgroundElem = document.querySelector(".hero__background");
	if (contentListElem === null || indicatorListElem === null || backgroundElem === null) {
		return;
	}

	// Content creation
	for (let i = 0; i < movieList.length; i++) {
		const item = document.createElement('div');
		item.classList.add('hero__content-item');
		item.innerHTML = `<div class="hero__content-item-anim"><h3 class="hero__content-title h2-inter semibold">${movieList[i].title}</h3><p class="hero__content-description h6-inter medium secondary">${movieList[i].description}</p></div>`;
		item.style.transform = `translateX(calc(${-i} * 100%))`;
		contentListElem.append(item);

		const itemWrapper = item.firstElementChild;
		itemWrapper.style.opacity = '0';
		contentItems.push(itemWrapper);
	
		const indicator = document.createElement('div');
		indicator.classList.add('hero__content-indicator-item');
		indicator.setAttribute('data-index', i);
		indicatorListElem.append(indicator);
		indicatorItems.push(indicator);
	}


	// Hero animation
	let movieIndex = 0;
	let timeout;
	contentItems[0].style.opacity = '1';
	backgroundElem.style.backgroundImage = `url(${movieList[0].backgroundImage})`;
	indicatorItems[0].classList.add('hero__content-indicator-item-active');

	function setMovieIndex(index) {
		if (index == movieIndex) {
			return;
		}

		contentItems[movieIndex].style.animationName = 'hero-item-hide';
		indicatorItems[movieIndex].classList.remove('hero__content-indicator-item-active');
		movieIndex = index;
		contentItems[movieIndex].style.animationName = 'hero-item-show';
		backgroundElem.style.backgroundImage = `url(${movieList[movieIndex].backgroundImage})`;
		indicatorItems[movieIndex].classList.add('hero__content-indicator-item-active');

		clearTimeout(timeout);
		timeout = setTimeout(nextMovie, 3000);
	}

	function nextMovie() {
		setMovieIndex((movieIndex + 1) % movieList.length);
	}

	timeout = setTimeout(nextMovie, 1000);


	// Indicator functionality
	indicatorItems.forEach((indicator) => {
		indicator.addEventListener('click', () => {
			setMovieIndex(+indicator.getAttribute('data-index'));
		})
	});
}

export { hero };