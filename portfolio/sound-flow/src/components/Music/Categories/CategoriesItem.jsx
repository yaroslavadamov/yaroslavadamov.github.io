import './CategoriesItem.scss';

export default function CategoriesItem({index, name, activePlaylist, setActivePlaylist}) {
	function handleClick() {
		setActivePlaylist(index);
	}

	return(
		<li className={"music__categories-item" + ((index === activePlaylist) ? " is-active" : "")}>
			<button
				className="h2 secondary adaptive"
				onClick={handleClick}
			>
				{name}
			</button>
		</li>
	);
}