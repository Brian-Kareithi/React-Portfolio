import { useEffect, useState } from 'react';

export const ScrollBar = () => {
	const [divHeight, setDivHeight] = useState<number>(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = (scrollTop / docHeight) * 100;
			setDivHeight(Math.min(scrollPercent, 98));
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		}; // Cleanup on unmount
	}, []);
	return (
		<div
			className='scroll-bar'
			style={{ top: `${divHeight}%`, '--p': `${divHeight * 100}%` }}
		></div>
	);
};
