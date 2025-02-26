import './Music.scss';
import { useState } from 'react';
import CategoriesList from './Categories/CategoriesList.jsx';
import Tracks from './Tracks/Tracks.jsx';

export default function Music({audioControls}) {
	const [activePlaylist, setActivePlaylist] = useState(1);

	return (
		<section className="music">
			<CategoriesList
				activePlaylist={activePlaylist}
				setActivePlaylist={setActivePlaylist}
			/>
			<Tracks
				audioControls={audioControls}
				activePlaylist={activePlaylist}
			/>
		</section>
	);
}