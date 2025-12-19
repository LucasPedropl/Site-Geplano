import React from 'react';
import { SiteData } from '../../../lib/types';
import { Field, Input, TextArea, SectionCard } from '../ui/AdminUI';
import { ImagePicker } from '../ImagePicker';
import { Trash2, Plus } from 'lucide-react';

interface HeroSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, setData }) => {
	return (
		<SectionCard title="Capa do Site (Hero)" id="hero">
			<Field label="Título Principal">
				<Input
					value={data.hero.title}
					onChange={(v) =>
						setData({
							...data,
							hero: { ...data.hero, title: v },
						})
					}
				/>
			</Field>
			<Field label="Subtítulo">
				<TextArea
					value={data.hero.subtitle}
					onChange={(v) =>
						setData({
							...data,
							hero: { ...data.hero, subtitle: v },
						})
					}
				/>
			</Field>
			<Field label="Texto do Botão">
				<Input
					value={data.hero.button}
					onChange={(v) =>
						setData({
							...data,
							hero: { ...data.hero, button: v },
						})
					}
				/>
			</Field>

			{/* Hero Images Slider Management */}
			<div className="mt-8 border-t border-gray-100 pt-6">
				<label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
					Imagens de Fundo (Slider)
				</label>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{(data.hero.images || []).map((img, idx) => (
						<div
							key={idx}
							className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group"
						>
							<div className="absolute top-2 right-2 z-10">
								<button
									onClick={() => {
										const newImages = [
											...(data.hero.images || []),
										];
										newImages.splice(idx, 1);
										setData({
											...data,
											hero: {
												...data.hero,
												images: newImages,
											},
										});
									}}
									className="bg-white text-red-500 p-1.5 rounded-full shadow-md hover:bg-red-50"
									title="Remover Imagem"
								>
									<Trash2 size={16} />
								</button>
							</div>
							<ImagePicker
								currentValue={img}
								onImageSelected={(url) => {
									const newImages = [
										...(data.hero.images || []),
									];
									newImages[idx] = url;
									setData({
										...data,
										hero: {
											...data.hero,
											images: newImages,
										},
									});
								}}
							/>
							<div className="text-xs text-center text-gray-400 mt-2 font-mono">
								Slide {idx + 1}
							</div>
						</div>
					))}
					<button
						onClick={() => {
							const newImages = [
								...(data.hero.images || []),
								'https://picsum.photos/1920/1080',
							];
							setData({
								...data,
								hero: {
									...data.hero,
									images: newImages,
								},
							});
						}}
						className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:border-geplano-green hover:text-geplano-green hover:bg-green-50 transition-all min-h-[200px]"
					>
						<Plus size={32} />
						<span className="font-bold mt-2">Adicionar Slide</span>
					</button>
				</div>
			</div>
		</SectionCard>
	);
};
