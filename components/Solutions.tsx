'use client';

import React, { useState } from 'react';
import { SiteData } from '../lib/types';
import { Section } from './Section';
import { Reveal } from './Reveal';

interface SolutionsProps {
	data: SiteData['solution'];
}

export const Solutions: React.FC<SolutionsProps> = ({ data }) => {
	const activeTabClass = 'border-geplano-gold text-geplano-gold';
	const inactiveTabClass =
		'border-transparent text-gray-400 hover:text-gray-600';
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="bg-gray-50">
			<Section id="solucao" className="text-center">
				<Reveal>
					<h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 uppercase mb-4 tracking-tight">
						{data.title}
					</h2>
					<p className="max-w-3xl mx-auto text-lg text-gray-600 mb-12">
						{data.subtitle}
					</p>

					<div className="max-w-6xl mx-auto">
						{/* Tabs Header - Scrollable on mobile with smooth scrolling */}
						<div className="flex flex-nowrap overflow-x-auto md:flex-row md:overflow-visible border-b border-gray-200 mb-8 pb-1 gap-4 md:gap-0 snap-x scroll-smooth">
							{data.tabs.map((tab, index) => (
								<button
									key={index}
									onClick={() => setActiveTab(index)}
									className={`flex-none snap-center py-4 px-6 md:px-0 md:flex-1 text-sm md:text-lg font-bold uppercase transition-all duration-300 border-b-4 whitespace-nowrap ${
										activeTab === index
											? activeTabClass
											: inactiveTabClass
									}`}
								>
									{tab}
								</button>
							))}
						</div>

						{/* Tab Content */}
						<div className="min-h-[300px] px-2">
							{activeTab === 0 && (
								<div className="grid md:grid-cols-3 gap-8 animate-fade-in-up">
									{data.content.pillars.map((item, idx) => (
										<div
											key={idx}
											className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
										>
											<h3 className="text-xl font-bold text-geplano-green mb-4">
												{item.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{item.text}
											</p>
										</div>
									))}
								</div>
							)}

							{activeTab === 1 && (
								<div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
									{data.content.advantages.map(
										(item, idx) => (
											<div
												key={idx}
												className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-left border-l-4 border-geplano-gold"
											>
												<h3 className="text-xl font-bold text-geplano-green mb-3">
													{item.title}
												</h3>
												<p className="text-gray-600 leading-relaxed">
													{item.text}
												</p>
											</div>
										)
									)}
								</div>
							)}

							{activeTab === 2 && (
								<div className="animate-fade-in-up">
									<h3 className="text-2xl font-display font-black text-gray-900 uppercase mb-6">
										{data.content.delivery.title}
									</h3>
									<p
										className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
										dangerouslySetInnerHTML={{
											__html: data.content.delivery.subtitle.replace(
												'GESTÃO INTEGRADA',
												'<strong class="text-geplano-gold">GESTÃO INTEGRADA</strong>'
											),
										}}
									/>

									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 text-left">
										{data.content.delivery.steps.map(
											(step, idx) => (
												<div
													key={idx}
													className="relative pl-14 md:pl-0 md:text-center group"
												>
													<span className="absolute left-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0 md:block text-5xl font-display font-black text-geplano-gold/10 group-hover:text-geplano-gold/30 transition-colors mb-2 select-none">
														{(idx + 1)
															.toString()
															.padStart(2, '0')}
													</span>
													<p className="text-sm font-bold text-gray-800 uppercase leading-tight relative z-10">
														{step}
													</p>
												</div>
											)
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</Reveal>
			</Section>
		</div>
	);
};
