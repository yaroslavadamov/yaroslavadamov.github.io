import { useEffect, useRef } from 'react';
import './CategoriesItem.scss';

export default function CategoriesItem({index, name, activePlaylist, setActivePlaylist}) {
	function handleClick() {
		setActivePlaylist(index);
	}

	const buttonRef = useRef(null);

	useEffect(() => {
		buttonRef.current.addEventListener('click', () => {
			buttonRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		})
	}, []);

	return(
		<li className={"music__categories-item" + ((index === activePlaylist) ? " is-active" : "")}>
			<button
				className="h2 secondary adaptive"
				onClick={handleClick}
				ref={buttonRef}
			>
				{name}
			</button>
		</li>
	);
}