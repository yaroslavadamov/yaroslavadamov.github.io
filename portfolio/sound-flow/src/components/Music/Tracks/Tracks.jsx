import './Tracks.scss';
import TrackCard from './TrackCard/TrackCard.jsx';
import { MUSIC, PLAYLISTS } from '../../../musicLibrary.js';

export default function Tracks({audioControls, activePlaylist}) {
	if (PLAYLISTS[activePlaylist].length === 0) {
		return(
			<div className='music__tracks-empty container'>
				<p className='p adaptive'>You haven't added anything to your favorites yet. Explore our music collection.</p>
			</div>
		);
	}

	return(
		<ul className="music__tracks container">
			{
				PLAYLISTS[activePlaylist].trackIdList.map((trackId, index) =>
					<TrackCard
						key={MUSIC[trackId].id}
						audioControls={audioControls}
						playlistIndex={activePlaylist}
						index={index}
					/>
				)
			}
		</ul>
	);
}