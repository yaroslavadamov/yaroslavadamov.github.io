import './RunningLine.scss';

export default function RunningLine({className, children}) {
	return (
		<div className={className}>
			<p className="running-line">
				{children}
			</p>
		</div>
	);
}