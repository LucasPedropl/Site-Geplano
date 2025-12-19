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

interface MissionSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const MissionSection: React.FC<MissionSectionProps> = ({
	data,
	setData,
}) => {
	return (
		<div id="mission">
			<SectionCard title="Missão, Visão e Propósito">
				<Field label="Título da Seção">
					<Input
						value={data.mission_vision_values.title}
						onChange={(v) =>
							setData({
								...data,
								mission_vision_values: {
									...data.mission_vision_values,
									title: v,
								},
							})
						}
					/>
				</Field>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="space-y-2">
						<Input
							className="font-bold"
							value={data.mission_vision_values.mission_title}
							onChange={(v) =>
								setData({
									...data,
									mission_vision_values: {
										...data.mission_vision_values,
										mission_title: v,
									},
								})
							}
						/>
						<TextArea
							rows={8}
							value={data.mission_vision_values.mission_text}
							onChange={(v) =>
								setData({
									...data,
									mission_vision_values: {
										...data.mission_vision_values,
										mission_text: v,
									},
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Input
							className="font-bold"
							value={data.mission_vision_values.vision_title}
							onChange={(v) =>
								setData({
									...data,
									mission_vision_values: {
										...data.mission_vision_values,
										vision_title: v,
									},
								})
							}
						/>
						<TextArea
							rows={8}
							value={data.mission_vision_values.vision_text}
							onChange={(v) =>
								setData({
									...data,
									mission_vision_values: {
										...data.mission_vision_values,
										vision_text: v,
									},
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Input
							className="font-bold"
							value={data.mission_vision_values.purpose_title}
							onChange={(v) =>
								setData({
									...data,
									mission_vision_values: {
										...data.mission_vision_values,
										purpose_title: v,
									},
								})
							}
						/>
						<TextArea
							rows={8}
							value={data.mission_vision_values.purpose_text}
							onChange={(v) =>
								setData({
									...data,
									mission_vision_values: {
										...data.mission_vision_values,
										purpose_text: v,
									},
								})
							}
						/>
					</div>
				</div>
			</SectionCard>
			<SectionCard title="Valores da Empresa">
				<Field label="Título dos Valores">
					<Input
						value={data.mission_vision_values.values_title}
						onChange={(v) =>
							setData({
								...data,
								mission_vision_values: {
									...data.mission_vision_values,
									values_title: v,
								},
							})
						}
					/>
				</Field>
				<div className="space-y-4">
					{data.mission_vision_values.values_list.map((val, idx) => (
						<div
							key={idx}
							className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg"
						>
							<div className="flex-grow space-y-2">
								<Input
									placeholder="Valor (Ex: Ética)"
									value={val.title}
									onChange={(v) => {
										const newList = [
											...data.mission_vision_values
												.values_list,
										];
										newList[idx].title = v;
										setData({
											...data,
											mission_vision_values: {
												...data.mission_vision_values,
												values_list: newList,
											},
										});
									}}
								/>
								<TextArea
									rows={2}
									placeholder="Descrição"
									value={val.text}
									onChange={(v) => {
										const newList = [
											...data.mission_vision_values
												.values_list,
										];
										newList[idx].text = v;
										setData({
											...data,
											mission_vision_values: {
												...data.mission_vision_values,
												values_list: newList,
											},
										});
									}}
								/>
							</div>
							<DeleteButton
								onClick={() => {
									const newList =
										data.mission_vision_values.values_list.filter(
											(_, i) => i !== idx
										);
									setData({
										...data,
										mission_vision_values: {
											...data.mission_vision_values,
											values_list: newList,
										},
									});
								}}
							/>
						</div>
					))}
					<AddButton
						label="Adicionar Valor"
						onClick={() => {
							const newList = [
								...data.mission_vision_values.values_list,
								{
									title: 'Novo Valor',
									text: 'Descrição do valor.',
								},
							];
							setData({
								...data,
								mission_vision_values: {
									...data.mission_vision_values,
									values_list: newList,
								},
							});
						}}
					/>
				</div>
			</SectionCard>
		</div>
	);
};
