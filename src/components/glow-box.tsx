type TGlowBox = {
	color: string;
	icon: React.ReactNode;
	title?: string;
};
export const GlowBox = ({ color, icon, title }: TGlowBox) => {
	return (
		<div className='glow-box-parent'>
			<div className='glow-box-title'>{title}</div>
			<div
				className='glow-box'
				style={{
					'--clr': color,
				}}
			>
				{icon}
			</div>
		</div>
	);
};
