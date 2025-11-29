import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { SiteData } from '../../../types';

interface HeaderProps {
  data: SiteData['header'];
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: data.nav_about, href: '#sobre' },
    { label: data.nav_team, href: '#equipe' },
    { label: data.nav_solution, href: '#solucao' },
    { label: data.nav_features, href: '#diferenciais' },
    { label: data.nav_projects, href: '#projetos' },
    { label: data.nav_other_solutions, href: '#outras-solucoes' },
    { label: data.nav_contact, href: '#contato' },
  ];

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || isMenuOpen 
      ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4' 
      : 'bg-transparent py-5 md:py-6'
  }`;

  const textClass = isScrolled || isMenuOpen ? 'text-gray-800' : 'text-white';
  
  // Logic to show black logo: if scrolled OR menu is open
  const showBlackLogo = isScrolled || isMenuOpen;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO AREA - Replaces SVG/Text with Images */}
        <a href="#home" className="relative h-12 md:h-16 w-48 md:w-56 flex-shrink-0">
             {/* Branca (White) - Visible when transparent header */}
             <img 
                src="img/LogoBrancaGrande.png" 
                alt="Geplano" 
                className={`absolute left-0 top-0 h-full w-auto object-contain transition-opacity duration-300 ${showBlackLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
             />
             
             {/* Preta (Black) - Visible when white header */}
             <img 
                src="img/LogoPretaGrande.png" 
                alt="Geplano" 
                className={`absolute left-0 top-0 h-full w-auto object-contain transition-opacity duration-300 ${showBlackLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
             />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs xl:text-sm font-bold uppercase tracking-wide hover:text-geplano-gold transition-colors ${textClass}`}
            >
              {link.label}
            </a>
          ))}
          
           {/* Temporary Admin Link */}
           <a
              href="#/admin"
              className={`text-xs xl:text-sm font-bold uppercase tracking-wide text-red-500 hover:text-red-700 transition-colors flex items-center gap-1`}
            >
              <Lock className="w-3 h-3" /> Admin
            </a>

          <a
            href={data.nav_portal}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-geplano-gold hover:bg-geplano-goldHover text-white px-6 py-2 rounded-md text-sm font-bold uppercase transition-all transform hover:-translate-y-0.5 shadow-sm"
          >
            Portal
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-md focus:outline-none transition-colors ${isMenuOpen ? 'bg-gray-100' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-8 h-8 text-gray-800" /> : <Menu className={`w-8 h-8 ${textClass}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 animate-fade-in-up">
          <div className="flex flex-col px-6 py-8 space-y-4 h-screen sm:h-auto overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 font-bold uppercase text-base hover:text-geplano-gold border-b border-gray-50 pb-2"
              >
                {link.label}
              </a>
            ))}
            
            <a
                href="#/admin"
                onClick={() => setIsMenuOpen(false)}
                className="text-red-500 font-bold uppercase text-base hover:text-red-700 flex items-center gap-2 pt-2"
              >
               <Lock className="w-4 h-4" /> Admin (Temp)
            </a>

            <a
              href={data.nav_portal}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-geplano-gold hover:bg-geplano-goldHover text-white text-center py-4 rounded-lg font-bold uppercase mt-4 shadow-md"
            >
              Portal do Cliente
            </a>
          </div>
        </div>
      )}
    </header>
  );
};