import React, { useState, useEffect } from 'react';
import { SiteData } from '../../../types';

interface HeroProps {
  data: SiteData['hero'];
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  // Use provided images or empty array. 
  // The contentService now ensures data.images is populated from constants if missing in DB.
  const images = data.images || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-20"></div>
             
             {images.map((img, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[1500ms] ease-in-out ${
                        index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                    style={{ backgroundImage: `url('${img}')` }}
                />
             ))}
        </div>

        <div className="relative z-30 max-w-5xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white uppercase leading-tight tracking-tighter mb-8 animate-fade-in-up drop-shadow-lg">
                {data.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto animate-fade-in-up font-medium leading-relaxed drop-shadow-md" style={{ animationDelay: '0.2s' }}>
                {data.subtitle}
            </p>
            <a 
                href="#solucao"
                className="inline-block bg-geplano-gold hover:bg-geplano-goldHover text-white font-bold py-4 px-12 rounded-lg uppercase tracking-widest transition-all transform hover:scale-105 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
            >
                {data.button}
            </a>
        </div>
    </section>
  );
};