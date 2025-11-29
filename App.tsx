import React, { useState, useEffect } from 'react';
import { SiteApp } from './apps/site/SiteApp';
import { AdminApp } from './apps/admin/AdminApp';

const App: React.FC = () => {
	const [route, setRoute] = useState(window.location.hash);

	useEffect(() => {
		const handleHashChange = () => {
			setRoute(window.location.hash);
		};

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, []);

	const normalizedRoute = route.toLowerCase();
	const isAdminRoute =
		normalizedRoute === '#site' ||
		normalizedRoute === '#/admin' ||
		normalizedRoute === '#admin';

	if (isAdminRoute) {
		return <AdminApp />;
	}

	return <SiteApp />;
};

export default App;
