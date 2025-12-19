import React from 'react';

interface SectionProps {
	id?: string;
	className?: string;
	children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
	id,
	className = '',
	children,
}) => {
	return (
		<section
			id={id}
			className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}
		>
			<div className="container mx-auto max-w-7xl">{children}</div>
		</section>
	);
};
