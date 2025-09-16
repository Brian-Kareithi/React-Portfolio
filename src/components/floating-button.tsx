type TFloatingBtn = {
	className?: string;
	label: string;
	onClick?: () => void;
	href?: string;
};
export const FloatingButton = ({ label, className, href }: TFloatingBtn) => {
	return (
		<a
			href={href}
			className={`floating-btn ${className}`}
		>
			<div>{label}</div>
			<span></span>
		</a>
	);
};
