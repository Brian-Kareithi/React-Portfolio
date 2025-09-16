type TTextHoverProps = {
	text: string;
	className?: string;
};

export const TextHover = ({ text, className }: TTextHoverProps) => {
	return (
		<p className={`hover-text ${className}`}>
			{text.split('').map((char, index) => (
				<span
					key={index}
					data-char={char}
					style={{
						'--delay': `${0.1 * index}s`,
					}}
				>
					{char}
				</span>
			))}
		</p>
	);
};
