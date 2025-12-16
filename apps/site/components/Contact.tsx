import React, { useState } from 'react';
import { SiteData } from '../../../types';
import { Section } from '../../../components/Section';
import { Reveal } from '../../../components/Reveal';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactProps {
	data: SiteData['contact'];
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Mailto fallback: opens email client prefilled
		const subject = encodeURIComponent('Contato via site Geplano');
		const body = encodeURIComponent(
			`Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`
		);
		window.location.href = `mailto:contato@geplanogestao.com.br?subject=${subject}&body=${body}`;
	};

	return (
		<Section
			id="contato"
			className="bg-geplano-green text-white overflow-hidden"
		>
			<div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
				<Reveal>
					<h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-6 tracking-tight leading-tight break-words">
						{data.title}
					</h2>
					<p className="text-gray-200 text-base md:text-lg mb-10 leading-relaxed">
						{data.text}
					</p>
					<div className="space-y-6 md:space-y-8">
						<div className="flex items-start gap-3 md:gap-5">
							<div className="w-10 h-10 md:w-14 md:h-14 min-w-[2.5rem] md:min-w-[3.5rem] rounded-full bg-geplano-gold flex items-center justify-center text-white shadow-lg shrink-0">
								<Phone className="w-5 h-5 md:w-6 md:h-6" />
							</div>
							<div className="min-w-0 flex-1 py-1">
								<p className="text-xs md:text-sm text-geplano-gold font-bold uppercase mb-1 tracking-wider">
									Telefone
								</p>
								<span className="font-semibold text-base md:text-xl block text-white break-words">
									{data.phone}
								</span>
							</div>
						</div>

						<div className="flex items-start gap-3 md:gap-5">
							<div className="w-10 h-10 md:w-14 md:h-14 min-w-[2.5rem] md:min-w-[3.5rem] rounded-full bg-geplano-gold flex items-center justify-center text-white shadow-lg shrink-0">
								<Mail className="w-5 h-5 md:w-6 md:h-6" />
							</div>
							<div className="min-w-0 flex-1 py-1">
								<p className="text-xs md:text-sm text-geplano-gold font-bold uppercase mb-1 tracking-wider">
									E-mail
								</p>
								<a
									href={`mailto:${data.email}`}
									className="font-semibold text-base md:text-xl block text-white break-all hover:text-geplano-gold transition-colors leading-tight"
								>
									{data.email}
								</a>
							</div>
						</div>

						<div className="flex items-start gap-3 md:gap-5">
							<div className="w-10 h-10 md:w-14 md:h-14 min-w-[2.5rem] md:min-w-[3.5rem] rounded-full bg-geplano-gold flex items-center justify-center text-white shadow-lg shrink-0">
								<MapPin className="w-5 h-5 md:w-6 md:h-6" />
							</div>
							<div className="min-w-0 flex-1 py-1">
								<p className="text-xs md:text-sm text-geplano-gold font-bold uppercase mb-1 tracking-wider">
									Endereço
								</p>
								<span className="font-semibold text-base md:text-xl block text-white leading-tight">
									{data.address}
								</span>
							</div>
						</div>
					</div>
				</Reveal>

				<Reveal className="w-full">
					<div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-full border border-white/10">
						<h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 md:mb-8 font-display uppercase tracking-tight">
							{data.form_title}
						</h3>
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div>
								<input
									type="text"
									placeholder="Seu Nome"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-geplano-gold focus:border-transparent outline-none transition-all"
								/>
							</div>
							<div>
								<input
									type="email"
									placeholder="Seu E-mail"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-geplano-gold focus:border-transparent outline-none transition-all"
								/>
							</div>
							<div>
								<input
									type="tel"
									placeholder="Seu Telefone"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-geplano-gold focus:border-transparent outline-none transition-all"
								/>
							</div>
							<div>
								<textarea
									rows={4}
									placeholder="Sua Mensagem"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-geplano-gold focus:border-transparent outline-none transition-all resize-none"
								></textarea>
							</div>
							<button className="w-full bg-geplano-gold hover:bg-geplano-goldHover text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 shadow-md">
								{data.form_button}
							</button>
						</form>
					</div>
				</Reveal>
			</div>
		</Section>
	);
};
