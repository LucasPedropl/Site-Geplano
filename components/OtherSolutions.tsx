'use client';

import React from 'react';
import { SiteData } from '../lib/types';
import { Section } from './Section';
import { Reveal } from './Reveal';
import { CheckCircle2 } from 'lucide-react';

interface OtherSolutionsProps {
	data: SiteData['other_solutions'];
}

export const OtherSolutions: React.FC<OtherSolutionsProps> = ({ data }) => {
	return (
		<Section id="outras-solucoes" className="bg-white">
			<Reveal className="text-center mb-16">
				<h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 uppercase tracking-tight">
					{data.title}
				</h2>
			</Reveal>

			{/* Using flex-wrap to center content nicely */}
			<div className="flex flex-wrap justify-center gap-6">
				{data.items.map((item, index) => (
					<Reveal
						key={index}
						className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-grow-0"
					>
						<div className="h-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group hover:border-geplano-green/30">
							<div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6 group-hover:bg-geplano-green transition-colors duration-300 shadow-inner">
								<CheckCircle2 className="w-8 h-8 text-geplano-green group-hover:text-white transition-colors duration-300" />
							</div>
							<p className="font-bold text-gray-800 leading-snug group-hover:text-geplano-green transition-colors text-lg">
								{item}
							</p>
						</div>
					</Reveal>
				))}
			</div>
		</Section>
	);
};
