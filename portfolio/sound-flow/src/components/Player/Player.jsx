import './Player.scss';
import DownloadButton from '../Buttons/DownloadButton.jsx';
import LikeButton from '../Buttons/LikeButton.jsx';
import ShuffleButton from '../Buttons/ShuffleButton.jsx';
import PlayPauseButton from '../Buttons/PlayPauseButton.jsx';
import PreviousButton from '../Buttons/PreviousButton.jsx';
import NextButton from '../Buttons/NextButton.jsx';
import LoopButton from '../Buttons/LoopButton.jsx';
import Timeline from './Timeline.jsx';
import RunningLine from '../RunningLine/RunningLine.jsx';
import { MUSIC, PLAYLISTS } from '../../musicLibrary.js';


export default function Player({audioControls}) {
	const trackId = PLAYLISTS[audioControls.playingPlaylist].trackIdList[audioControls.trackIndex];

	return(
		<section className="player">
			<div
				className="player__cover"
				style={{backgroundImage: `url(${MUSIC[trackId].coverImageURL})`}}
			></div>

			<div className="player__ui">

				<div className="player__ui-title">
					<DownloadButton
						audioURL={MUSIC[trackId].audioURL}
					/>
					<LikeButton
						onClick={() => audioControls.handleLike(trackId)}
						liked={MUSIC[trackId].liked}
					/>
					<div className="player__ui-title-name">
						<RunningLine className="player__ui-title-name-song h1">
							{MUSIC[trackId].title}
						</RunningLine>
						{/* <p className="player__ui-title-name-song h1">{MUSIC[trackId].title}</p> */}
						<p className="player__ui-title-name-author p secondary">{MUSIC[trackId].author}</p>
					</div>
				</div>

				<div className="player__ui-control">
					<Timeline
						audioControls={audioControls}
					/>
					<div className="player__ui-control-buttons">
						<ShuffleButton
							audioControls={audioControls}
						/>
						<PreviousButton
							audioControls={audioControls}
						/>
						<PlayPauseButton
							audioControls={audioControls}
						/>
						<NextButton
							audioControls={audioControls}
						/>
						<LoopButton
							audioControls={audioControls}
						/>
					</div>
				</div>

			</div>

		</section>
	);
}