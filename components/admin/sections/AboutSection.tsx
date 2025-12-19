import React from 'react';
import { SiteData } from '../../../lib/types';
import { Field, Input, TextArea, SectionCard } from '../ui/AdminUI';

interface AboutSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
	data,
	setData,
}) => {
	return (
		<SectionCard title="Sobre a Geplano" id="about">
			<Field label="Título da Seção">
				<Input
					value={data.about.title}
					onChange={(v) =>
						setData({
							...data,
							about: { ...data.about, title: v },
						})
					}
				/>
			</Field>
			<Field label="Parágrafo Introdutório">
				<TextArea
					rows={6}
					value={data.about.p1}
					onChange={(v) =>
						setData({
							...data,
							about: { ...data.about, p1: v },
						})
					}
				/>
			</Field>
			<Field label="Parágrafo Secundário">
				<TextArea
					rows={6}
					value={data.about.p2}
					onChange={(v) =>
						setData({
							...data,
							about: { ...data.about, p2: v },
						})
					}
				/>
			</Field>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{data.about.stats.map((stat, idx) => (
					<div
						key={idx}
						className="bg-gray-50 p-4 rounded-lg border border-gray-200"
					>
						<label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
							Estatística {idx + 1}
						</label>
						<Input
							className="mb-2"
							placeholder="Valor"
							value={stat.value}
							onChange={(v) => {
								const newStats = [...data.about.stats];
								newStats[idx].value = v;
								setData({
									...data,
									about: {
										...data.about,
										stats: newStats,
									},
								});
							}}
						/>
						<Input
							placeholder="Rótulo"
							value={stat.label}
							onChange={(v) => {
								const newStats = [...data.about.stats];
								newStats[idx].label = v;
								setData({
									...data,
									about: {
										...data.about,
										stats: newStats,
									},
								});
							}}
						/>
					</div>
				))}
			</div>
		</SectionCard>
	);
};
