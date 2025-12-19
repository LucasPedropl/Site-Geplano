import { SiteData } from './types';

export const INITIAL_SITE_DATA: SiteData = {
	header: {
		nav_about: 'Sobre Nós',
		nav_solution: 'Nossa Solução',
		nav_features: 'Diferenciais',
		nav_projects: 'Projetos',
		nav_other_solutions: 'Outras Soluções',
		nav_contact: 'Contato',
		nav_portal: 'Portal do Cliente',
	},
	hero: {
		title: 'CONSTRUIR NUNCA FOI TÃO TRANQUILO',
		subtitle:
			'Gerenciamos obras de alto padrão com excelência construtiva, para proporcionar total tranquilidade aos nossos clientes.',
		button: 'Descubra Nossa Solução',
		images: [
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
		],
	},
	about: {
		title: 'Para nós, construir é mais do que executar: é cuidar.',
		p1: 'Fundada em 2014, a Geplano se destaca por ser uma empresa especializada em Gestão de Obras e Contratos. Iniciamos atuando no mercado de prestação de serviços de construção civil na área industrial, no Espírito Santo e Sul da Bahia, mas a partir de 2021 direcionamos nossas atenções para a execução de obras em São Mateus-ES e região.',
		p2: 'Com um corpo técnico experiente e qualificado, que já esteve à frente de grandes obras e contratos no setor industrial, hoje podemos dizer que temos uma metodologia Geplano de atuar. Cuidamos minuciosamente de todo o processo produtivo, desde o planejamento até o pós-obra, um modelo de trabalho único e exclusivo em nossa região de atuação.',
		stats: [
			{ value: '+30', label: 'Anos de Experiência do Corpo Técnico' },
			{ value: '+400', label: 'Projetos Executados' },
			{ value: '+20.000', label: 'M² Construídos' },
			{ value: '+50', label: 'Contratos Gerenciados' },
		],
	},
	mission_vision_values: {
		title: 'Nossa Essência',
		mission_title: 'Missão',
		mission_text:
			'Transformar projetos em obras de alto padrão que unem sofisticação, confiança e exclusividade, proporcionando aos nossos clientes a tranquilidade de investir e viver em espaços planejados e executados com excelência.',
		vision_title: 'Visão',
		vision_text:
			'Ser reconhecida até 2030 como referência em administração de obras de alto padrão no Espírito Santo, com um modelo exclusivo de gestão transparente e personalizada que transforma cada projeto em uma experiência única.',
		purpose_title: 'Propósito',
		purpose_text:
			'Gerenciar obras de alto padrão com excelência construtiva, para proporcionar total tranquilidade aos nossos clientes.',
		values_title: 'Valores',
		values_list: [
			{
				title: 'Exclusividade',
				text: 'Cada obra é concebida como única, refletindo a identidade e os sonhos de cada cliente.',
			},
			{
				title: 'Excelência',
				text: 'Padrão máximo de qualidade e atenção aos detalhes em todas as etapas.',
			},
			{
				title: 'Transparência',
				text: 'Clareza absoluta na gestão e no uso dos recursos, com confiança mútua.',
			},
			{
				title: 'Inovação',
				text: 'Uso de tecnologia e práticas avançadas que elevam a sofisticação do processo construtivo.',
			},
			{
				title: 'Segurança',
				text: 'Garantia de solidez, cumprimento rigoroso de normas, prazos e investimentos.',
			},
			{
				title: 'Ética',
				text: 'Compromisso inegociável com integridade, respeito e responsabilidade.',
			},
		],
	},
	solution: {
		title: 'O Método mais Econômico, Transparente e Tranquilo de Construir',
		subtitle:
			'Atuamos no modelo Obra por Administração, também chamado de Obra a Preço de Custo. Conheça os pilares da nossa solução:',
		tabs: ['Os 3 Pilares', 'Suas Vantagens', 'O que Entregamos'],
		content: {
			pillars: [
				{
					title: 'Gestão Completa',
					text: 'Assumimos toda a gestão da obra, do pré-obra ao pós-obra, cuidando de cada detalhe operacional e burocrático. Com total transparência e foco no melhor custo-benefício, entregamos tranquilidade para o cliente.',
				},
				{
					title: 'Faturamento Direto',
					text: 'Todas as despesas são faturadas diretamente em nome do cliente. Isso garante controle total e visibilidade dos custos, pagando exatamente o preço de custo, sem margem de lucro e bitributação.',
				},
				{
					title: 'Taxa de Administração',
					text: 'Nossa remuneração é clara e justa, definida por uma taxa de administração sobre o custo total da obra ou um valor fixo mensal. Não vendemos produtos ou serviços com margem, o cliente paga o que a obra vale.',
				},
			],
			advantages: [
				{
					title: 'Acompanhamento do Custo Real',
					text: 'Acesso a informações detalhadas sobre tudo o que está sendo utilizado e seus custos efetivos, garantindo conhecimento do custo real da obra.',
				},
				{
					title: 'Economia de até 30%',
					text: 'Sem bitributação e margem de lucro sobre materiais e mão de obra, o cliente paga exatamente pelo que está utilizando, resultando em uma economia significativa.',
				},
				{
					title: 'Flexibilidade de Alterações',
					text: 'Máxima flexibilidade para alterações no projeto sem aditivos na nossa remuneração. O custo de qualquer alteração é assumido pelo cliente a preço de custo.',
				},
				{
					title: 'Redução na Perda de Materiais',
					text: 'Nossa gestão especializada garante o controle rigoroso sobre o uso e armazenamento de materiais, reduzindo o desvio e o desperdício.',
				},
			],
			delivery: {
				title: 'Método G10',
				subtitle:
					'Entregamos uma GESTÃO INTEGRADA única e exclusiva na região de atuação, que engloba o gerenciamento de todos os processos do pré-obra ao pós-obra.',
				steps: [
					'Contratação / Análise de Projetos',
					'Orçamento, Planejamento e Controle',
					'Planilhas do Financiamento',
					'Recrutamento e Seleção da M.O',
					'Regularização (Prefeitura, Receita, Cartório)',
					'Supervisão da M.O.',
					'Suprimentos (Cotação, Compra, Locação)',
					'Monitoramento da Qualidade',
					'Monitoramento da Saúde e Segurança',
					'Elaboração do Manual do Proprietário',
				],
			},
		},
	},
	differentiators: {
		title: 'Tecnologia e Método: Nossa Fórmula para a sua Tranquilidade',
		subtitle:
			'Unimos tecnologia de ponta a um método de gestão comprovado para oferecer uma experiência de construção sem precedentes em controle e eficiência.',
		app_title: 'Sua Obra na Palma da Mão',
		app_text:
			'Com nosso aplicativo exclusivo, você tem o controle total do seu projeto, onde quer que esteja. É a materialização da nossa promessa de transparência e gestão inteligente.',
		app_features: [
			{
				name: 'Acompanhar cronograma',
				image: 'https://picsum.photos/300/650?random=10',
			},
			{
				name: 'Acessar cotações',
				image: 'https://picsum.photos/300/650?random=11',
			},
			{
				name: 'Aprovar compras',
				image: 'https://picsum.photos/300/650?random=12',
			},
			{
				name: 'Visualizar finanças',
				image: 'https://picsum.photos/300/650?random=13',
			},
			{
				name: 'Acessar diário de obra',
				image: 'https://picsum.photos/300/650?random=14',
			},
			{
				name: 'Acessar documentos',
				image: 'https://picsum.photos/300/650?random=15',
			},
		],
	},
	projects: {
		title: 'Excelência em Execução',
		subtitle:
			'Nosso portfólio é a prova do nosso compromisso com a qualidade, o design e a entrega de resultados que superam as expectativas.',
		filters: [
			'Todos',
			'Residencial',
			'Corporativo',
			'Industrial',
			'Em Andamento',
		],
		items: [
			{
				id: 1,
				category: ['industrial'],
				image: 'https://picsum.photos/800/600?random=20',
				title: 'Prédio Pré-Moldado',
				location: 'Suzano - Mucuri/BA',
				description:
					'Construção de prédio pré-moldado da cortadeira de papel com 10.000 m² de área construída.',
			},
			{
				id: 2,
				category: ['industrial'],
				image: 'https://picsum.photos/800/600?random=21',
				title: 'Caldeira de Biomassa',
				location: 'Suzano - Mucuri/BA',
				description:
					'Implantação de caldeira de biomassa e pipe rack com fundações através de hélice contínua e estaca raiz.',
			},
			{
				id: 3,
				category: ['industrial'],
				image: 'https://picsum.photos/800/600?random=22',
				title: 'Alteamento de Aterro',
				location: 'Suzano - Imperatriz/MA',
				description:
					'Alteamento do Aterro Industrial que envolveu uma movimentação superior a 100.000,00 m³ de terra.',
			},
			{
				id: 4,
				category: ['industrial'],
				image: 'https://picsum.photos/800/600?random=23',
				title: 'Fechamento de Alvenaria',
				location: 'Suzano - Aracruz/ES',
				description:
					'Fechamento de 2.700,00m² de alvenaria armada com blocos estruturais e com vãos de até 14 metros de altura.',
			},
			{
				id: 9,
				category: ['residencial', 'em-andamento'],
				image: 'https://picsum.photos/800/600?random=24',
				title: 'Residencial Unifamiliar',
				location: 'Residencial Golden Garden - São Mateus/ES',
				description:
					'Construção Residencial Unifamiliar com 427,49 m² para Dr. Vitor Barbalho e Dra. Anamélia Dalla Bernardina.',
			},
			{
				id: 10,
				category: ['corporativo', 'em-andamento'],
				image: 'https://picsum.photos/800/600?random=25',
				title: 'Clínica Oftalmológica Prime',
				location: 'Carapina - São Mateus/ES',
				description:
					'2ª Fase da Construção com destinação hospitalar com 1.891,19 m².',
			},
		],
	},
	other_solutions: {
		title: 'Outras Soluções Geplano',
		items: [
			'Estudo de Viabilidade para Construção',
			'Documentos para Financiamento Imobiliário',
			'Unificação e/ou Desdobro de Terreno',
			'Engenharia de Custos',
			'Regularização de Imóveis e Obras',
			'Consultoria de Obra por Administração',
			'Projetos Complementares de Engenharia',
		],
	},
	contact: {
		title: 'Vamos Construir Juntos?',
		text: 'Se você busca uma parceria baseada em confiança, transparência e excelência para seu próximo projeto de alto padrão, entre em contato. Nossa equipe está pronta para transformar sua visão em realidade.',
		phone: '27 99724-7384',
		email: 'contato@geplanoengenharia.com.br',
		address: 'São Mateus - ES',
		instagram: '',
		linkedin: '',
		whatsapp: '',
		form_title: 'Fale com um Especialista',
		form_button: 'Enviar Mensagem',
	},
	footer: {
		copyright:
			'Geplano Gestão e Consultoria de Obras. Todos os direitos reservados.',
	},
};
