'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SiteData } from '../lib/types';
import { Section } from './Section';
import { Reveal } from './Reveal';
import { Check } from 'lucide-react';

interface AppShowcaseProps {
	data: SiteData['differentiators'];
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({ data }) => {
	const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
	const phoneRef = useRef<HTMLDivElement | null>(null);

	// Smoothly scroll phone into view on mobile/tablet when feature changes
	const handleFeatureClick = (index: number) => {
		setActiveFeatureIndex(index);
		if (typeof window === 'undefined') return;

		const isMobileOrTablet = window.innerWidth < 1024; // only scroll on tablet/mobile
		if (!isMobileOrTablet || !phoneRef.current) return;

		const offset = 80; // bring the phone a bit below the fixed header
		const rect = phoneRef.current.getBoundingClientRect();
		const scrollTop = window.scrollY + rect.top - offset;

		window.scrollTo({ top: scrollTop, behavior: 'smooth' });
	};

	return (
		<Section id="diferenciais" className="bg-white">
			<div className="grid lg:grid-cols-2 gap-16 items-center">
				<Reveal>
					<h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 uppercase mb-6 tracking-tight">
						{data.title}
					</h2>
					<p className="text-lg text-gray-600 mb-10 leading-relaxed">
						{data.subtitle}
					</p>

					<h3 className="text-2xl font-bold text-geplano-green mb-4">
						{data.app_title}
					</h3>
					<p className="text-gray-600 mb-8 leading-relaxed">
						{data.app_text}
					</p>

					<div className="grid sm:grid-cols-2 gap-4">
						{data.app_features.map((feat, i) => (
							<button
								key={i}
								onClick={() => handleFeatureClick(i)}
								className={`flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-300 group border ${
									activeFeatureIndex === i
										? 'bg-geplano-green text-white shadow-lg border-geplano-green transform scale-105'
										: 'bg-white text-gray-700 border-gray-100 hover:border-geplano-gold/30 hover:bg-gray-50 hover:shadow-md'
								}`}
							>
								<div
									className={`p-1.5 rounded-full transition-colors ${
										activeFeatureIndex === i
											? 'bg-white/20 text-white'
											: 'bg-green-50 text-geplano-green group-hover:bg-geplano-gold group-hover:text-white'
									}`}
								>
									<Check className="w-4 h-4" />
								</div>
								<span className="text-xs font-bold uppercase tracking-wider">
									{feat.name}
								</span>
							</button>
						))}
					</div>
				</Reveal>

				<Reveal
					className="flex justify-center pt-8 lg:pt-0"
					innerRef={phoneRef}
				>
					<div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[550px] sm:h-[650px] mx-auto bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-3 shadow-2xl border-[8px] border-gray-900 ring-1 ring-gray-900/50">
						{/* Notch */}
						<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-7 bg-gray-900 rounded-b-xl z-20 flex justify-center">
							<div className="w-12 sm:w-16 h-1.5 bg-gray-800 rounded-full mt-2"></div>
						</div>

						{/* Screen Area */}
						<div className="relative w-full h-full bg-gray-800 rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden">
							{/* Images with transition */}
							{data.app_features.map((feat, i) => (
								<img
									key={i}
									src={feat.image}
									alt={`Tela ${feat.name}`}
									className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
										activeFeatureIndex === i
											? 'opacity-100 z-10 scale-100'
											: 'opacity-0 z-0 scale-95'
									}`}
								/>
							))}

							{/* Fallback/Loader behind images */}
							<div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-[-1]">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</Section>
	);
};
