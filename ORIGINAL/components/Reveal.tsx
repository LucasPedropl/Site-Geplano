import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
	children: React.ReactNode;
	className?: string;
	innerRef?: React.Ref<HTMLDivElement>;
}

export const Reveal: React.FC<RevealProps> = ({
	children,
	className = '',
	innerRef,
}) => {
	const localRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.1 }
		);

		if (localRef.current) {
			observer.observe(localRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const setRefs = (node: HTMLDivElement | null) => {
		localRef.current = node;
		if (typeof innerRef === 'function') {
			innerRef(node);
		} else if (innerRef && 'current' in innerRef) {
			(
				innerRef as React.MutableRefObject<HTMLDivElement | null>
			).current = node;
		}
	};

	return (
		<div
			ref={setRefs}
			className={`transition-all duration-1000 ease-out transform ${
				isVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-10'
			} ${className}`}
		>
			{children}
		</div>
	);
};
