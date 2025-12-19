export interface SiteData {
	header: {
		nav_about: string;
		nav_solution: string;
		nav_features: string;
		nav_projects: string;
		nav_other_solutions: string;
		nav_contact: string;
		nav_portal: string;
	};
	hero: {
		title: string;
		subtitle: string;
		button: string;
		images: string[];
	};
	about: {
		title: string;
		p1: string;
		p2: string;
		stats: Array<{ value: string; label: string }>;
	};
	mission_vision_values: {
		title: string;
		mission_title: string;
		mission_text: string;
		vision_title: string;
		vision_text: string;
		purpose_title: string;
		purpose_text: string;
		values_title: string;
		values_list: Array<{ title: string; text: string }>;
	};
	solution: {
		title: string;
		subtitle: string;
		tabs: string[];
		content: {
			pillars: Array<{ title: string; text: string }>;
			advantages: Array<{ title: string; text: string }>;
			delivery: {
				title: string;
				subtitle: string;
				steps: string[];
			};
		};
	};
	differentiators: {
		title: string;
		subtitle: string;
		app_title: string;
		app_text: string;
		app_features: Array<{ name: string; image: string }>;
	};
	projects: {
		title: string;
		subtitle: string;
		filters: string[];
		items: Array<{
			id: number;
			category: string[];
			image: string;
			title: string;
			location: string;
			description: string;
		}>;
	};
	other_solutions: {
		title: string;
		items: string[];
	};
	contact: {
		title: string;
		text: string;
		phone: string;
		email: string;
		address: string;
		form_title: string;
		form_button: string;
	};
	footer: {
		copyright: string;
	};
}
