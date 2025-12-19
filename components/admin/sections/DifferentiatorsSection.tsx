import React from 'react';
import { SiteData } from '../../../lib/types';
import {
	Field,
	Input,
	TextArea,
	SectionCard,
	DeleteButton,
	AddButton,
} from '../ui/AdminUI';
import { ImagePicker } from '../ImagePicker';
import { CheckCircle2 } from 'lucide-react';

interface DifferentiatorsSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const DifferentiatorsSection: React.FC<DifferentiatorsSectionProps> = ({
	data,
	setData,
}) => {
	return (
		<SectionCard title="App & Diferenciais" id="differentiators">
			<Field label="Título">
				<Input
					value={data.differentiators.title}
					onChange={(v) =>
						setData({
							...data,
							differentiators: {
								...data.differentiators,
								title: v,
							},
						})
					}
				/>
			</Field>
			<Field label="Subtítulo">
				<TextArea
					value={data.differentiators.subtitle}
					onChange={(v) =>
						setData({
							...data,
							differentiators: {
								...data.differentiators,
								subtitle: v,
							},
						})
					}
				/>
			</Field>
			<div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mt-6">
				<h4 className="font-bold text-gray-900 mb-4">Seção do App</h4>
				<Field label="Título do App">
					<Input
						value={data.differentiators.app_title}
						onChange={(v) =>
							setData({
								...data,
								differentiators: {
									...data.differentiators,
									app_title: v,
								},
							})
						}
					/>
				</Field>
				<Field label="Texto do App">
					<TextArea
						value={data.differentiators.app_text}
						onChange={(v) =>
							setData({
								...data,
								differentiators: {
									...data.differentiators,
									app_text: v,
								},
							})
						}
					/>
				</Field>

				<h5 className="font-bold text-gray-700 mb-2 text-sm uppercase">
					Funcionalidades (Lista)
				</h5>
				<div className="space-y-4">
					{data.differentiators.app_features.map((feat, idx) => (
						<div
							key={idx}
							className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded border border-gray-100 items-start"
						>
							<div className="flex-grow space-y-3 w-full">
								<div className="flex items-center gap-2">
									<CheckCircle2
										size={16}
										className="text-geplano-green"
									/>
									<Input
										value={feat.name}
										onChange={(v) => {
											const newFeats = [
												...data.differentiators
													.app_features,
											];
											newFeats[idx].name = v;
											setData({
												...data,
												differentiators: {
													...data.differentiators,
													app_features: newFeats,
												},
											});
										}}
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
									<div className="flex items-center gap-2">
										<ImagePicker
											label="Imagem da Tela"
											currentValue={feat.image}
											onImageSelected={(url) => {
												const newFeats = [
													...data.differentiators
														.app_features,
												];
												newFeats[idx].image = url;
												setData({
													...data,
													differentiators: {
														...data.differentiators,
														app_features: newFeats,
													},
												});
											}}
										/>
									</div>

									<div className="w-full flex justify-center">
										<div className="relative w-40 md:w-48 aspect-[9/19] rounded-3xl border border-gray-200 shadow-inner bg-gray-900 overflow-hidden">
											<div className="absolute inset-0 bg-gray-800" />
											<div className="absolute inset-2 rounded-2xl bg-black overflow-hidden">
												{feat.image ? (
													<img
														src={feat.image}
														alt={`Preview ${feat.name}`}
														className="w-full h-full object-cover"
													/>
												) : (
													<div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
														Pré-visualização
													</div>
												)}
											</div>
											<div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-1 h-12 rounded-full bg-gray-300" />
											<div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-1 h-12 rounded-full bg-gray-300" />
											<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-gray-700" />
										</div>
									</div>
								</div>
							</div>
							<DeleteButton
								onClick={() => {
									const newFeats =
										data.differentiators.app_features.filter(
											(_, i) => i !== idx
										);
									setData({
										...data,
										differentiators: {
											...data.differentiators,
											app_features: newFeats,
										},
									});
								}}
							/>
						</div>
					))}
					<AddButton
						label="Adicionar Funcionalidade"
						onClick={() => {
							const newFeats = [
								...data.differentiators.app_features,
								{
									name: 'Nova Funcionalidade',
									image: 'https://picsum.photos/300/650',
								},
							];
							setData({
								...data,
								differentiators: {
									...data.differentiators,
									app_features: newFeats,
								},
							});
						}}
					/>
				</div>
			</div>
		</SectionCard>
	);
};
