document.addEventListener('DOMContentLoaded', function () {
	const mainContent = document.getElementById('main-content');
	const header = document.getElementById('header');
	const mobileMenuButton = document.getElementById('mobile-menu-button');
	const mobileMenu = document.getElementById('mobile-menu');

	// --- CARREGAMENTO DE CONTEÚDO DINÂMICO ---
	async function loadContent() {
		try {
			const response = await fetch('texts.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			populatePage(data);
		} catch (error) {
			console.error(
				'Não foi possível carregar o conteúdo do site:',
				error
			);
			mainContent.innerHTML = `<div class="h-screen flex items-center justify-center"><p class="text-center text-red-500 p-8">Erro ao carregar o conteúdo. Tente recarregar a página.</p></div>`;
		}
	}

	function populatePage(data) {
		// Header
		document.getElementById('nav-about').textContent =
			data.header.nav_about;
		document.getElementById('nav-team').textContent = data.header.nav_team;
		document.getElementById('nav-solution').textContent =
			data.header.nav_solution;
		document.getElementById('nav-projects').textContent =
			data.header.nav_projects;
		document.getElementById('nav-contact').textContent =
			data.header.nav_contact;
		document.getElementById('nav-portal').textContent =
			data.header.nav_portal;
		document.getElementById('nav-features').textContent =
			data.header.nav_features;
		document.getElementById('nav-other-solutions').textContent =
			data.header.nav_other_solutions;

		// Mobile Menu
		const mobileNavContainer = document.getElementById(
			'mobile-nav-container'
		);
		mobileNavContainer.innerHTML = `
            <a href="#sobre" class="mobile-nav-link">${data.header.nav_about}</a>
            <a href="#equipe" class="mobile-nav-link">${data.header.nav_team}</a>
            <a href="#solucao" class="mobile-nav-link">${data.header.nav_solution}</a>
            <a href="#diferenciais" class="mobile-nav-link">${data.header.nav_features}</a>
            <a href="#projetos" class="mobile-nav-link">${data.header.nav_projects}</a>
            <a href="#outras-solucoes" class="mobile-nav-link">${data.header.nav_other_solutions}</a>
            <a href="#contato" class="mobile-nav-link">${data.header.nav_contact}</a>
            <a href="https://www.obraprimaweb.com.br/portalcliente/geplanoengenharia" target="_blank" class="mobile-nav-link mt-2 bg-geplano-gold text-white text-center">${data.header.nav_portal}</a>
        `;

		// Hero
		document.getElementById('hero-title').textContent = data.hero.title;
		document.getElementById('hero-subtitle').textContent =
			data.hero.subtitle;
		document.getElementById('hero-button').textContent = data.hero.button;

		// Sobre
		document.getElementById('about-title').textContent = data.about.title;
		document.getElementById('about-p1').textContent = data.about.p1;
		document.getElementById('about-p2').textContent = data.about.p2;
		const statsGrid = document.getElementById('stats-grid');
		statsGrid.innerHTML = data.about.stats
			.map(
				(stat) => `
            <div class="p-4">
                <p class="text-3xl sm:text-4xl md:text-5xl font-bold text-geplano-gold">${stat.value}</p>
                <p class="mt-2 text-gray-500">${stat.label}</p>
            </div>
        `
			)
			.join('');

		// Missão, Visão, Valores
		document.getElementById('mvv-title').textContent =
			data.mission_vision_values.title;

		const mvpGrid = document.getElementById('mvp-grid');
		const mvpData = [
			{
				title: data.mission_vision_values.mission_title,
				text: data.mission_vision_values.mission_text,
			},
			{
				title: data.mission_vision_values.vision_title,
				text: data.mission_vision_values.vision_text,
			},
			{
				title: data.mission_vision_values.purpose_title,
				text: data.mission_vision_values.purpose_text,
			},
		];

		mvpGrid.innerHTML = mvpData
			.map(
				(item) => `
            <div class="bg-white p-8 rounded-lg shadow-md flex flex-col text-center">
                <h3 class="text-2xl font-bold text-geplano-gold">${item.title}</h3>
                <p class="mt-2 text-gray-600 flex-grow">${item.text}</p>
            </div>
        `
			)
			.join('');

		document.getElementById('values-title').textContent =
			data.mission_vision_values.values_title;
		const valuesGrid = document.getElementById('values-grid');
		valuesGrid.innerHTML = data.mission_vision_values.values_list
			.map(
				(value) => `
            <div class="value-card bg-white p-6 rounded-lg">
                <h4 class="font-bold text-lg text-geplano-green">${value.title}</h4>
                <p class="mt-2 text-sm text-gray-600">${value.text}</p>
            </div>
        `
			)
			.join('');

		// Equipe
		document.getElementById('team-title').textContent = data.team.title;
		const teamGrid = document.getElementById('team-grid');
		teamGrid.innerHTML = data.team.members
			.map(
				(member) => `
            <div class="text-center p-4">
                <img src="${member.image}" alt="Foto de ${member.name}" class="w-48 h-48 mx-auto rounded-full object-cover mb-4 shadow-lg">
                <h3 class="font-bold text-xl">${member.name}</h3>
                <p class="text-geplano-gold font-semibold">${member.role}</p>
                <p class="mt-2 text-gray-600 text-sm">${member.description}</p>
            </div>
        `
			)
			.join('');

		// Solução
		document.getElementById('solution-title').textContent =
			data.solution.title;
		document.getElementById('solution-subtitle').textContent =
			data.solution.subtitle;

		// Outras Soluções
		document.getElementById('other-solutions-title').textContent =
			data.other_solutions.title;
		const otherSolutionsGrid = document.getElementById(
			'other-solutions-grid'
		);
		const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`;
		otherSolutionsGrid.innerHTML = data.other_solutions.items
			.map(
				(item) => `
            <div class="other-solution-card p-6 rounded-lg h-full">
                <div class="icon-container w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    ${checkIcon}
                </div>
                <p class="font-semibold text-geplano-green leading-snug">${item}</p>
            </div>
        `
			)
			.join('');

		// Contato
		document.getElementById('contact-title').textContent =
			data.contact.title;
		document.getElementById('contact-text').textContent = data.contact.text;
		document.getElementById('contact-phone').textContent =
			data.contact.phone;
		document.getElementById('contact-email').textContent =
			data.contact.email;
		document.getElementById('contact-address').textContent =
			data.contact.address;
		document.getElementById('form-title').textContent =
			data.contact.form_title;
		document.getElementById('form-button').textContent =
			data.contact.form_button;

		// Footer
		document.getElementById('copyright-text').textContent =
			data.footer.copyright;

		// Funções que dependem de dados
		setupSolutionTabs(data.solution);
		setupDifferentiatorsApp(data.differentiators);
		setupPortfolio(data.projects);

		// Re-inicializa observadores de scroll após popular o conteúdo
		setupScrollReveal();
		setupSectionObserver();
	}

	loadContent();

	// --- LÓGICA DE INTERAÇÃO ---

	// Header Scroll & Menu
	function handleScroll() {
		if (header.classList.contains('menu-open')) return;
		if (window.scrollY > 50) {
			header.classList.remove('transparent');
			header.classList.add('scrolled');
		} else {
			if (mobileMenu.classList.contains('hidden')) {
				header.classList.add('transparent');
				header.classList.remove('scrolled');
			}
		}
	}
	window.addEventListener('scroll', handleScroll);

	function closeMenu() {
		mobileMenu.classList.add('hidden');
		header.classList.remove('menu-open');
		mobileMenuButton.innerHTML = `<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
		handleScroll();
	}

	mobileMenuButton.addEventListener('click', (e) => {
		e.stopPropagation();
		const isMenuOpening = mobileMenu.classList.contains('hidden');
		mobileMenu.classList.toggle('hidden');

		if (isMenuOpening) {
			header.classList.add('menu-open');
			header.classList.remove('transparent', 'scrolled');
			mobileMenuButton.innerHTML = `<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
		} else {
			closeMenu();
		}
	});

	document.addEventListener('click', (e) => {
		if (
			!mobileMenu.classList.contains('hidden') &&
			!header.contains(e.target)
		) {
			closeMenu();
		}
	});

	// Hero Slider
	const heroImages = [
		'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
	];
	const sliderContainer = document.getElementById('hero-slider');
	heroImages.forEach((imgUrl, index) => {
		const slide = document.createElement('div');
		slide.className = 'hero-slide';
		slide.style.backgroundImage = `url('${imgUrl}')`;
		if (index === 0) slide.classList.add('active');
		sliderContainer.appendChild(slide);
	});

	let currentSlide = 0;
	const slides = document.querySelectorAll('.hero-slide');
	if (slides.length > 1) {
		setInterval(() => {
			slides[currentSlide].classList.remove('active');
			currentSlide = (currentSlide + 1) % slides.length;
			slides[currentSlide].classList.add('active');
		}, 6000);
	}

	// Scroll Suave para Âncoras
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			if (!mobileMenu.classList.contains('hidden')) closeMenu();

			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				let headerOffset = header.offsetHeight;
				if (targetId === '#home') headerOffset = 0;

				const elementPosition =
					targetElement.getBoundingClientRect().top;
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({ top: offsetPosition });
			}
		});
	});

	// Scroll Reveal
	function setupScrollReveal() {
		const scrollRevealElements =
			document.querySelectorAll('.scroll-reveal');
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);
		scrollRevealElements.forEach((el) => revealObserver.observe(el));
	}

	// Navegação Ativa por Seção
	function setupSectionObserver() {
		const sections = document.querySelectorAll('main section[id]');
		const navLinks = document.querySelectorAll('header nav a');
		const observerOptions = {
			root: null,
			rootMargin: '-40% 0px -60% 0px',
			threshold: 0,
		};
		const sectionObserver = new IntersectionObserver((entries) => {
			let visibleSectionId = null;
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visibleSectionId = entry.target.getAttribute('id');
				}
			});

			navLinks.forEach((link) => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${visibleSectionId}`) {
					link.classList.add('active');
				}
			});
		}, observerOptions);
		sections.forEach((section) => {
			sectionObserver.observe(section);
		});
	}

	// Tabs da Seção Solução
	function setupSolutionTabs(solutionData) {
		const tabsContainer = document.getElementById(
			'solution-tabs-container'
		);
		const contentContainer = document.getElementById(
			'solution-content-container'
		);

		tabsContainer.innerHTML = solutionData.tabs
			.map(
				(tab, index) =>
					`<button class="tab-btn px-1 py-4 text-sm md:text-lg font-medium transition-colors duration-300 ${
						index === 0 ? 'active' : ''
					}" data-tab="tab${index}">${tab}</button>`
			)
			.join('');

		const pillarsHtml = `<div class="grid md:grid-cols-3 gap-8 text-left">${solutionData.content.pillars
			.map(
				(p) => `
            <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-gray-900">${p.title}</h3>
                <p class="mt-2 text-gray-600">${p.text}</p>
            </div>`
			)
			.join('')}
        </div>`;
		const advantagesHtml = `<div class="grid md:grid-cols-2 gap-8 text-left">${solutionData.content.advantages
			.map(
				(p) => `
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900">${p.title}</h3>
                <p class="mt-2 text-gray-600">${p.text}</p>
            </div>`
			)
			.join('')}
        </div>`;
		const deliveryHtml = `<div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 uppercase font-taruno">${
				solutionData.content.delivery.title
			}</h3>
            <p class="mt-4 max-w-4xl mx-auto text-lg text-gray-700">
                ${solutionData.content.delivery.subtitle.replace(
					'GESTÃO INTEGRADA',
					'<span class="font-bold text-geplano-gold">GESTÃO INTEGRADA</span>'
				)}
            </p>
            <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-4 text-left" style="counter-reset: step-counter;">
                ${solutionData.content.delivery.steps
					.map(
						(step) =>
							`<div class="g10-step"><p class="text-sm font-semibold text-gray-700 uppercase">${step}</p></div>`
					)
					.join('')}
            </div>
        </div>`;

		contentContainer.innerHTML = `
            <div id="tab0" class="tab-content active mt-8">${pillarsHtml}</div>
            <div id="tab1" class="tab-content mt-8">${advantagesHtml}</div>
            <div id="tab2" class="tab-content mt-8">${deliveryHtml}</div>
        `;

		const tabs = document.querySelectorAll('.tab-btn');
		const tabContents = document.querySelectorAll('.tab-content');
		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				tabs.forEach((t) => t.classList.remove('active'));
				tab.classList.add('active');
				const target = tab.getAttribute('data-tab');
				tabContents.forEach((content) => {
					content.id === target
						? content.classList.add('active')
						: content.classList.remove('active');
				});
			});
		});
	}

	// App Seção Diferenciais
	function setupDifferentiatorsApp(data) {
		document.getElementById('differentiators-title').textContent =
			data.title;
		document.getElementById('differentiators-subtitle').textContent =
			data.subtitle;
		document.getElementById('app-title').textContent = data.app_title;
		document.getElementById('app-text').textContent = data.app_text;

		const appFeaturesContainer = document.getElementById('app-features');
		appFeaturesContainer.innerHTML = data.app_features
			.map(
				(feature, index) => `
            <li>
                <button class="app-feature-btn w-full text-left p-3 rounded-lg transition-colors duration-300 ${
					index === 0 ? 'active' : ''
				}" data-image="${feature.image}">
                    ${feature.name}
                </button>
            </li>
        `
			)
			.join('');

		const appFeatureBtns = document.querySelectorAll('.app-feature-btn');
		const appScreen = document.getElementById('app-screen');
		appScreen.src = data.app_features[0].image;

		appFeatureBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				appFeatureBtns.forEach((b) => b.classList.remove('active'));
				btn.classList.add('active');
				const newImage = btn.getAttribute('data-image');
				appScreen.style.opacity = '0';
				setTimeout(() => {
					appScreen.src = newImage;
					appScreen.style.opacity = '1';
				}, 300);
			});
		});
	}

	// Portfolio
	function setupPortfolio(projectData) {
		document.getElementById('projects-title').textContent =
			projectData.title;
		document.getElementById('projects-subtitle').textContent =
			projectData.subtitle;

		const filtersContainer = document.getElementById('portfolio-filters');
		filtersContainer.innerHTML = projectData.filters
			.map(
				(filter, index) =>
					`<button class="filter-btn px-4 py-2 text-sm md:text-base font-semibold border-2 border-geplano-green text-geplano-green rounded-full ${
						index === 0 ? 'active' : ''
					}" data-filter="${filter
						.toLowerCase()
						.replace(/ /g, '-')}">${filter}</button>`
			)
			.join('');

		const portfolioGrid = document.getElementById('portfolio-grid');
		const filterBtns = document.querySelectorAll('.filter-btn');

		function renderPortfolio(filter = 'todos') {
			portfolioGrid.innerHTML = '';

			const filteredProjects =
				filter === 'todos'
					? projectData.items
					: projectData.items.filter((p) =>
							p.category.includes(filter)
					  );

			filteredProjects.forEach((project) => {
				const projectEl = document.createElement('div');
				projectEl.className = `scroll-reveal`;
				projectEl.innerHTML = `
                    <div class="project-card bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                        <div class="overflow-hidden">
                           <img src="${project.image}" alt="${project.title}" class="w-full h-56 object-cover">
                        </div>
                        <div class="p-6 flex-grow flex flex-col">
                            <h3 class="text-xl font-bold text-geplano-green">${project.title}</h3>
                            <p class="text-sm text-geplano-gold font-semibold mt-1">${project.location}</p>
                            <p class="mt-4 text-gray-600 text-sm flex-grow">${project.description}</p>
                        </div>
                    </div>
                `;
				portfolioGrid.appendChild(projectEl);
			});
			// Re-observa os novos elementos
			document.querySelectorAll('.scroll-reveal').forEach((el) => {
				const revealObserver = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								entry.target.classList.add('visible');
								revealObserver.unobserve(entry.target);
							}
						});
					},
					{ threshold: 0.1 }
				);
				revealObserver.observe(el);
			});
		}

		filterBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
				filterBtns.forEach((b) => b.classList.remove('active'));
				btn.classList.add('active');
				const filter = btn.getAttribute('data-filter');
				renderPortfolio(filter);
			});
		});

		renderPortfolio();
	}

	// Ano atual no Footer
	document.getElementById('current-year').textContent =
		new Date().getFullYear();
});
