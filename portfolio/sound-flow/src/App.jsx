import './App.scss';
import { useState, useRef, useEffect } from 'react';
import { MUSIC, PLAYLISTS } from './musicLibrary.js';
import Logo from './components/Logo/Logo.jsx';
import SubscribeButton from './components/Buttons/SubscribeButton.jsx';
import Player from './components/Player/Player.jsx';
import Music from './components/Music/Music.jsx';
import SubscribePopUp from './components/SubscribePopUp/SubscribePopUp.jsx';
import { preloadImage } from './scripts/utils.js';


export default function App() {
	const [playingPlaylist, setPlayingPlaylist] = useState(1);
	const [trackIndex, setTrackIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isShuffled, setIsShuffled] = useState(false);
	const [isLooped, setIsLooped] = useState(false);
	const [trackProgress, setTrackProgress] = useState(0);
	const favoritesListSource = PLAYLISTS[0].trackIdList;
	const [favoritesList, setFavoritesList] = useState([...favoritesListSource]);

	function getTrackId(playlist = playingPlaylist, track = trackIndex) {
		return PLAYLISTS[playlist].trackIdList[track];
	}

	function getAudioUrl(id = getTrackId()) {
		return MUSIC[id].audioURL;
	}

	const audioRef = useRef(new Audio(getAudioUrl()));
	const intervalRef = useRef();

	useEffect(() => {
		preloadImage(MUSIC[getTrackId(playingPlaylist, 1)].coverImageURL);
	}, [])

	// Set background
	function getTrackBackgroundColor(id = getTrackId()) {
		return MUSIC[id].backgroundColor;
	}

	function setBackgroundColor(color) {
		document.documentElement.style.setProperty('--color-bg-gradient', color)
	}

	setBackgroundColor(getTrackBackgroundColor(getTrackId()));

	// Like
	function handleLike(trackId) {
		let index = favoritesListSource.indexOf(trackId);
		if (index === -1) {
			MUSIC[trackId].liked = true;
			favoritesListSource.push(trackId);
		} else {
			MUSIC[trackId].liked = false;
			favoritesListSource.splice(index, 1);
		}
		setFavoritesList([...favoritesListSource]);
	}

	// Shuffle
	function handleShuffle() {
		setIsShuffled(!isShuffled);
	}

	// Play pause
	function handlePlayPause() {
		setIsPlaying(!isPlaying);
	}

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying])

	function handleLoop() {
		setIsLooped(!isLooped);
	}

	// Play selected track
	function handlePlayAudio(playlist, trackIndex) {
		audioRef.current.pause();
		setTrackProgress(0);

		setPlayingPlaylist(playlist);
		setTrackIndex(trackIndex);
		audioRef.current = new Audio(getAudioUrl(getTrackId(playlist, trackIndex)));
		audioRef.current.play();
		setIsPlaying(true);

		setBackgroundColor(getTrackBackgroundColor(getTrackId(playlist, trackIndex)));

		if (trackIndex != PLAYLISTS[playlist].length - 1) {
			preloadImage(MUSIC[getTrackId(playlist, trackIndex + 1)].coverImageURL);
		}
	}

	// Previous track
	function handlePreviousTrack() {
		handlePlayAudio(playingPlaylist, trackIndex - 1);
	}

	// Next track
	function handleNextTrack() {
		if (trackIndex === PLAYLISTS[playingPlaylist].length - 1) {
			setIsPlaying(false);
		} else {
			handlePlayAudio(playingPlaylist, trackIndex + 1);
		}
	}

	// Timer that updates the timeline and handles the end of the track
	function startTimer() {
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				if (isShuffled) {
					let nextTrack = trackIndex;
					while (nextTrack === trackIndex) {
						nextTrack = Math.floor(Math.random() * PLAYLISTS[playingPlaylist].length);
					}
					handlePlayAudio(playingPlaylist, nextTrack);
				} else if (trackIndex === PLAYLISTS[playingPlaylist].length - 1) {
					if (isLooped) {
						handlePlayAudio(playingPlaylist, 0)
					} else {
						setIsPlaying(false);
						setTrackProgress(0);
					}
				} else {
					handleNextTrack();
				}
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, 250);
	}
	
	startTimer();

	// Rewind audio
	function handleRewindAudio(pos) {
		audioRef.current.currentTime = audioRef.current.duration * pos;
		setTrackProgress(audioRef.current.currentTime);
	}

	// Controlers
	const audioControls = {
		playingPlaylist,
		setPlayingPlaylist,
		trackIndex,
		setTrackIndex,
		isPlaying,
		setIsPlaying,
		isShuffled,
		setIsShuffled,
		isLooped,
		setIsLooped,
		trackProgress,
		handleLike,
		handleShuffle,
		handlePlayPause,
		handlePreviousTrack,
		handleNextTrack,
		handleLoop,
		handlePlayAudio,
		handleRewindAudio,
	}


	return (
		<>
			<header className="header container">
				<Logo />
				<SubscribeButton />
			</header>
			<main className="main">
				<Player audioControls={audioControls}/>
				<Music audioControls={audioControls}/>
				<SubscribePopUp />
			</main>
			<footer className="footer container">
				<p className="footer__content p-small secondary adaptive">© <a href="https://yaroslavadamov.github.io/">Yaroslav Adamov</a>, <time datetime="2025">2025</time></p>
			</footer>
		</>
	);
}