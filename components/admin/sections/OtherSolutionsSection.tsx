import React from 'react';
import { SiteData } from '../../../lib/types';
import {
	Field,
	Input,
	SectionCard,
	DeleteButton,
	AddButton,
} from '../ui/AdminUI';

interface OtherSolutionsSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const OtherSolutionsSection: React.FC<OtherSolutionsSectionProps> = ({
	data,
	setData,
}) => {
	return (
		<SectionCard title="Outras Soluções" id="other-solutions">
			<Field label="Título">
				<Input
					value={data.other_solutions.title}
					onChange={(v) =>
						setData({
							...data,
							other_solutions: {
								...data.other_solutions,
								title: v,
							},
						})
					}
				/>
			</Field>

			<h4 className="font-bold text-gray-700 mb-3 uppercase text-sm mt-2">
				Lista de Soluções
			</h4>
			<div className="space-y-3">
				{data.other_solutions.items.map((item, idx) => (
					<div
						key={idx}
						className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3"
					>
						<Input
							value={item}
							onChange={(v) => {
								const newItems = [
									...data.other_solutions.items,
								];
								newItems[idx] = v;
								setData({
									...data,
									other_solutions: {
										...data.other_solutions,
										items: newItems,
									},
								});
							}}
							className="flex-1"
						/>
						<DeleteButton
							onClick={() => {
								const newItems =
									data.other_solutions.items.filter(
										(_, i) => i !== idx
									);
								setData({
									...data,
									other_solutions: {
										...data.other_solutions,
										items: newItems,
									},
								});
							}}
						/>
					</div>
				))}
				<AddButton
					label="Adicionar Solução"
					onClick={() =>
						setData({
							...data,
							other_solutions: {
								...data.other_solutions,
								items: [
									...data.other_solutions.items,
									'Nova solução',
								],
							},
						})
					}
				/>
			</div>
		</SectionCard>
	);
};
