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

  // User requested to see Admin screen immediately
  // We keep the routing logic structure but default to AdminApp for this session
  if (route === '#/' || route === '#home' || route === '') {
       return <SiteApp />;
  }

  if (route === '#site') {
      
     
      return <AdminApp />;
  }

   return <SiteApp />;
};

export default App;