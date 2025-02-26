import './Timeline.scss';
import { useState, useEffect, useRef } from 'react';
import { MUSIC, PLAYLISTS } from '../../musicLibrary.js';
import { timeFormating, clamp } from '../../scripts/utils.js';

export default function Timeline({audioControls}) {
	const trackId = PLAYLISTS[audioControls.playingPlaylist].trackIdList[audioControls.trackIndex];
	const progress = clamp(audioControls.trackProgress / MUSIC[trackId].duration * 100, 0, 100);

	const [rewind, setRewind] = useState(false);
	const [rewindPosition, setRewindPosition] = useState(0);

	const elemRef = useRef(null);


	function calculateRewindPosition(event) {
		const width = elemRef.current.clientWidth;
		const x = clamp(event.clientX - elemRef.current.getBoundingClientRect().left, 0, width);
		return (x / width);
	}

	function handleSetRewindPosition(event) {
		setRewindPosition(calculateRewindPosition(event));
	}


	function handleMouseDown(event) {
		handleSetRewindPosition(event);
		setRewind(true);
	}

	function handleTouchStart(event) {
		handleSetRewindPosition(event.touches[0]);
		setRewind(true);
	}

	useEffect(() => {
		function handleMouseMove(event) {
			handleSetRewindPosition(event);
		};

		function handleTouchMove(event) {
			handleSetRewindPosition(event.touches[0]);
		};

		function handleMouseUp(event) {
			audioControls.handleRewindAudio(calculateRewindPosition(event));
			setRewind(false);
		}

		function handleTouchEnd(event) {
			console.log(event);
			audioControls.handleRewindAudio(calculateRewindPosition(event.changedTouches[0]));
			setRewind(false);
		}

		if (rewind) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("touchmove", handleTouchMove, {passive: false});
			window.addEventListener("touchend", handleTouchEnd);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [rewind]);


	return (
		<div
			className="timeline"
		>
			<div className="timeline__time">
				<span className="p secondary adaptive">{timeFormating(audioControls.trackProgress)}</span>
				<span className="p secondary adaptive">{timeFormating(MUSIC[trackId].duration)}</span>
			</div>
			<div
				className="timeline__progressbar"
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
				ref={elemRef}
			>
				<div
					className="timeline__progressbar-total"
				></div>
				<div
					className="timeline__progressbar-current"
					style={{width: `${rewind ? rewindPosition * 100 : progress}%`}}
				></div>
				<div
					className={"timeline__progressbar-dot" + (rewind ? " rewind" : "")}
					style={{left: `calc(${rewind ? rewindPosition * 100 : progress}% - var(--width) / 2)`}}
				></div>
			</div>
		</div>
	);
}