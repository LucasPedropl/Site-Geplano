import React from 'react';
import { SiteData } from '../../../lib/types';
import { Field, Input, TextArea, SectionCard } from '../ui/AdminUI';

interface ContactSectionProps {
	data: SiteData;
	setData: (data: SiteData) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
	data,
	setData,
}) => {
	return (
		<SectionCard title="Contato" id="contact">
			<Field label="Título">
				<Input
					value={data.contact.title ?? ''}
					onChange={(v) =>
						setData({
							...data,
							contact: { ...data.contact, title: v },
						})
					}
				/>
			</Field>
			<Field label="Descrição / Subtítulo">
				<TextArea
					value={data.contact.text ?? ''}
					onChange={(v) =>
						setData({
							...data,
							contact: { ...data.contact, text: v },
						})
					}
				/>
			</Field>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				<Field label="Email">
					<Input
						value={data.contact.email ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, email: v },
							})
						}
					/>
				</Field>
				<Field label="Telefone">
					<Input
						value={data.contact.phone ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, phone: v },
							})
						}
					/>
				</Field>
				<Field label="Endereço">
					<Input
						value={data.contact.address ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, address: v },
							})
						}
					/>
				</Field>
				<Field label="Instagram">
					<Input
						value={data.contact.instagram ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, instagram: v },
							})
						}
					/>
				</Field>
				<Field label="LinkedIn">
					<Input
						value={data.contact.linkedin ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, linkedin: v },
							})
						}
					/>
				</Field>
				<Field label="Whatsapp">
					<Input
						value={data.contact.whatsapp ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, whatsapp: v },
							})
						}
					/>
				</Field>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
				<Field label="Título do Formulário">
					<Input
						value={data.contact.form_title ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, form_title: v },
							})
						}
					/>
				</Field>
				<Field label="Texto do Botão">
					<Input
						value={data.contact.form_button ?? ''}
						onChange={(v) =>
							setData({
								...data,
								contact: { ...data.contact, form_button: v },
							})
						}
					/>
				</Field>
			</div>
		</SectionCard>
	);
};
