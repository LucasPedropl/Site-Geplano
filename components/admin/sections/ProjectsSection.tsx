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

const normalizeTag = (tag: string) =>
	tag.toLowerCase().trim().replace(/\s+/g, '-');

interface ProjectsSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
	data,
	setData,
}) => {
	const tags = data.projects.filters.filter((tag) => tag !== 'Todos');

	return (
		<SectionCard title="Portfólio (Projetos)" id="projects">
			<Field label="Título">
				<Input
					value={data.projects.title}
					onChange={(v) =>
						setData({
							...data,
							projects: { ...data.projects, title: v },
						})
					}
				/>
			</Field>
			<Field label="Subtítulo">
				<TextArea
					value={data.projects.subtitle}
					onChange={(v) =>
						setData({
							...data,
							projects: { ...data.projects, subtitle: v },
						})
					}
				/>
			</Field>

			<div className="mt-6 space-y-3">
				<h4 className="font-bold text-gray-700 uppercase text-sm">
					Tags / Categorias
				</h4>
				{tags.map((tag, idx) => (
					<div
						key={idx}
						className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3"
					>
						<Input
							value={tag}
							onChange={(v) => {
								const updated = [...tags];
								updated[idx] = v;
								setData({
									...data,
									projects: {
										...data.projects,
										filters: [
											'Todos',
											...updated.filter(Boolean),
										],
									},
								});
							}}
							className="flex-1"
						/>
						<DeleteButton
							onClick={() => {
								const updated = tags.filter(
									(_, i) => i !== idx
								);
								const filters = ['Todos', ...updated];
								const cleanedItems = data.projects.items.map(
									(item) => {
										const allowedSlugs = filters.map(
											(tagLabel) => normalizeTag(tagLabel)
										);
										const newCategories =
											item.category.filter((c) =>
												allowedSlugs.includes(c)
											);
										return {
											...item,
											category: newCategories,
										};
									}
								);
								setData({
									...data,
									projects: {
										...data.projects,
										filters,
										items: cleanedItems,
									},
								});
							}}
						/>
					</div>
				))}
				<AddButton
					label="Adicionar Tag"
					onClick={() => {
						const existing = data.projects.filters.filter(
							(tag) => tag !== 'Todos'
						);
						setData({
							...data,
							projects: {
								...data.projects,
								filters: ['Todos', ...existing, 'Nova Tag'],
							},
						});
					}}
				/>
			</div>

			<div className="space-y-6 mt-6">
				{data.projects.items.map((proj, idx) => (
					<div
						key={idx}
						className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col lg:flex-row gap-6 items-start"
					>
						<div className="grow space-y-4 w-full">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Field label="Nome do Projeto">
									<Input
										value={proj.title}
										onChange={(v) => {
											const newItems = [
												...data.projects.items,
											];
											newItems[idx].title = v;
											setData({
												...data,
												projects: {
													...data.projects,
													items: newItems,
												},
											});
										}}
									/>
								</Field>
								<Field label="Localização">
									<Input
										value={proj.location}
										onChange={(v) => {
											const newItems = [
												...data.projects.items,
											];
											newItems[idx].location = v;
											setData({
												...data,
												projects: {
													...data.projects,
													items: newItems,
												},
											});
										}}
									/>
								</Field>
							</div>
							<Field label="Descrição">
								<TextArea
									value={proj.description}
									onChange={(v) => {
										const newItems = [
											...data.projects.items,
										];
										newItems[idx].description = v;
										setData({
											...data,
											projects: {
												...data.projects,
												items: newItems,
											},
										});
									}}
								/>
							</Field>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<ImagePicker
									label="Imagem Principal"
									currentValue={proj.image}
									onImageSelected={(url) => {
										const newItems = [
											...data.projects.items,
										];
										newItems[idx].image = url;
										setData({
											...data,
											projects: {
												...data.projects,
												items: newItems,
											},
										});
									}}
								/>
								<div className="space-y-2">
									<label className="block text-sm font-medium text-gray-700">
										Tag cadastrada
									</label>
									<select
										value={proj.category?.[0] ?? ''}
										onChange={(e) => {
											const selected = e.target.value;
											const newItems = [
												...data.projects.items,
											];
											newItems[idx].category = selected
												? [selected]
												: [];
											setData({
												...data,
												projects: {
													...data.projects,
													items: newItems,
												},
											});
										}}
										className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-geplano-green/20 focus:border-geplano-green transition-all outline-none shadow-sm"
									>
										<option value="">
											Selecione uma tag
										</option>
										{tags.map((tag) => {
											const slug = normalizeTag(tag);
											return (
												<option key={slug} value={slug}>
													{tag}
												</option>
											);
										})}
									</select>
								</div>
							</div>
						</div>
						<DeleteButton
							onClick={() => {
								const newItems = data.projects.items.filter(
									(_, i) => i !== idx
								);
								setData({
									...data,
									projects: {
										...data.projects,
										items: newItems,
									},
								});
							}}
						/>
					</div>
				))}
				<AddButton
					label="Adicionar Projeto"
					onClick={() => {
						const firstTag = tags[0] ? normalizeTag(tags[0]) : '';
						const nextId =
							data.projects.items.reduce(
								(max, item) => Math.max(max, item.id || 0),
								0
							) + 1;
						const newItems = [
							...data.projects.items,
							{
								id: nextId,
								title: 'Novo Projeto',
								location: 'Localização',
								description: 'Descrição do projeto...',
								image: 'https://picsum.photos/800/600',
								category: firstTag ? [firstTag] : [],
							},
						];
						setData({
							...data,
							projects: { ...data.projects, items: newItems },
						});
					}}
				/>
			</div>
		</SectionCard>
	);
};
