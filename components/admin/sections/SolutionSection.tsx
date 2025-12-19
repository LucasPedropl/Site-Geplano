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

interface SolutionSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({
	data,
	setData,
}) => {
	return (
		<div id="solution">
			<SectionCard title="Solução - Cabeçalho">
				<Field label="Título">
					<Input
						value={data.solution.title}
						onChange={(v) =>
							setData({
								...data,
								solution: {
									...data.solution,
									title: v,
								},
							})
						}
					/>
				</Field>
				<Field label="Subtítulo">
					<TextArea
						value={data.solution.subtitle}
						onChange={(v) =>
							setData({
								...data,
								solution: {
									...data.solution,
									subtitle: v,
								},
							})
						}
					/>
				</Field>
			</SectionCard>

			<SectionCard title="Solução - Pilares (Tab 1)">
				{data.solution.content.pillars.map((item, idx) => (
					<div
						key={idx}
						className="mb-4 pb-4 border-b border-gray-100 last:border-0"
					>
						<Input
							className="mb-2 font-bold text-geplano-green"
							value={item.title}
							onChange={(v) => {
								const newPillars = [
									...data.solution.content.pillars,
								];
								newPillars[idx].title = v;
								setData({
									...data,
									solution: {
										...data.solution,
										content: {
											...data.solution.content,
											pillars: newPillars,
										},
									},
								});
							}}
						/>
						<TextArea
							rows={2}
							value={item.text}
							onChange={(v) => {
								const newPillars = [
									...data.solution.content.pillars,
								];
								newPillars[idx].text = v;
								setData({
									...data,
									solution: {
										...data.solution,
										content: {
											...data.solution.content,
											pillars: newPillars,
										},
									},
								});
							}}
						/>
					</div>
				))}
			</SectionCard>

			<SectionCard title="Solução - Vantagens (Tab 2)">
				{data.solution.content.advantages.map((item, idx) => (
					<div
						key={idx}
						className="mb-4 pb-4 border-b border-gray-100 last:border-0"
					>
						<div className="flex justify-between items-center mb-2">
							<Input
								className="font-bold text-geplano-gold flex-grow mr-2"
								value={item.title}
								onChange={(v) => {
									const newAdv = [
										...data.solution.content.advantages,
									];
									newAdv[idx].title = v;
									setData({
										...data,
										solution: {
											...data.solution,
											content: {
												...data.solution.content,
												advantages: newAdv,
											},
										},
									});
								}}
							/>
							<DeleteButton
								onClick={() => {
									const newAdv =
										data.solution.content.advantages.filter(
											(_, i) => i !== idx
										);
									setData({
										...data,
										solution: {
											...data.solution,
											content: {
												...data.solution.content,
												advantages: newAdv,
											},
										},
									});
								}}
							/>
						</div>
						<TextArea
							rows={2}
							value={item.text}
							onChange={(v) => {
								const newAdv = [
									...data.solution.content.advantages,
								];
								newAdv[idx].text = v;
								setData({
									...data,
									solution: {
										...data.solution,
										content: {
											...data.solution.content,
											advantages: newAdv,
										},
									},
								});
							}}
						/>
					</div>
				))}
				<AddButton
					label="Adicionar Vantagem"
					onClick={() => {
						const newAdv = [
							...data.solution.content.advantages,
							{
								title: 'Nova Vantagem',
								text: 'Descrição',
							},
						];
						setData({
							...data,
							solution: {
								...data.solution,
								content: {
									...data.solution.content,
									advantages: newAdv,
								},
							},
						});
					}}
				/>
			</SectionCard>

			<SectionCard title="Solução - Entrega (Tab 3)">
				<Field label="Título">
					<Input
						value={data.solution.content.delivery.title}
						onChange={(v) =>
							setData({
								...data,
								solution: {
									...data.solution,
									content: {
										...data.solution.content,
										delivery: {
											...data.solution.content.delivery,
											title: v,
										},
									},
								},
							})
						}
					/>
				</Field>
				<Field label="Subtítulo">
					<TextArea
						value={data.solution.content.delivery.subtitle}
						onChange={(v) =>
							setData({
								...data,
								solution: {
									...data.solution,
									content: {
										...data.solution.content,
										delivery: {
											...data.solution.content.delivery,
											subtitle: v,
										},
									},
								},
							})
						}
					/>
				</Field>

				<label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
					Passos da Entrega
				</label>
				<div className="space-y-2">
					{data.solution.content.delivery.steps.map((step, idx) => (
						<div key={idx} className="flex gap-2">
							<span className="w-8 h-10 flex items-center justify-center font-bold text-gray-400 bg-gray-100 rounded">
								{idx + 1}
							</span>
							<Input
								value={step}
								onChange={(v) => {
									const newSteps = [
										...data.solution.content.delivery.steps,
									];
									newSteps[idx] = v;
									setData({
										...data,
										solution: {
											...data.solution,
											content: {
												...data.solution.content,
												delivery: {
													...data.solution.content
														.delivery,
													steps: newSteps,
												},
											},
										},
									});
								}}
							/>
							<DeleteButton
								onClick={() => {
									const newSteps =
										data.solution.content.delivery.steps.filter(
											(_, i) => i !== idx
										);
									setData({
										...data,
										solution: {
											...data.solution,
											content: {
												...data.solution.content,
												delivery: {
													...data.solution.content
														.delivery,
													steps: newSteps,
												},
											},
										},
									});
								}}
							/>
						</div>
					))}
					<AddButton
						label="Adicionar Passo"
						onClick={() => {
							const newSteps = [
								...data.solution.content.delivery.steps,
								'Novo Passo',
							];
							setData({
								...data,
								solution: {
									...data.solution,
									content: {
										...data.solution.content,
										delivery: {
											...data.solution.content.delivery,
											steps: newSteps,
										},
									},
								},
							});
						}}
					/>
				</div>
			</SectionCard>
		</div>
	);
};
