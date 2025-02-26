import { MUSIC, PLAYLISTS } from '../../musicLibrary.js';

export default function NextButton({audioControls, height = 32}) {
	const active = audioControls.trackIndex < PLAYLISTS[audioControls.playingPlaylist].length - 1;

	return (
		<button
			className={"next-button button" + (active ? "" : " inactive")}
			onClick={active ? audioControls.handleNextTrack : null}
		>
			<svg height={height} viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M21.984 14.72L2.776 1.52267C1.25067 0.501334 0 1.25067 0 3.18933V28.8133C0 30.7467 1.25067 31.496 2.776 30.48L21.984 17.2773C21.984 17.2773 22.728 16.7467 22.728 16.0027C22.728 15.256 21.984 14.72 21.984 14.72ZM26.6667 0H28.3333C29.808 0 31 0.128 31 1.6V30.4C31 31.872 29.808 32 28.3333 32H26.6667C25.192 32 24 31.872 24 30.4V1.6C24 0.128 25.192 0 26.6667 0Z" fill="white"/>
			</svg>
		</button>
	)
}