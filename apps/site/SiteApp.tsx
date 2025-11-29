import React, { useEffect, useState } from 'react';
import { SiteData } from '../../types';
import { getContent } from '../../services/contentService';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { Projects } from './components/Projects';
import { AppShowcase } from './components/AppShowcase';
import { OtherSolutions } from './components/OtherSolutions';
import { Contact } from './components/Contact';
import { Section } from '../../components/Section';
import { Reveal } from '../../components/Reveal';
import { CountUp } from '../../components/CountUp';

export const SiteApp: React.FC = () => {
  const [data, setData] = useState<SiteData | null>(null);

  const loadData = async () => {
    const content = await getContent();
    setData(content);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('contentUpdated', loadData);
    return () => window.removeEventListener('contentUpdated', loadData);
  }, []);

  if (!data) return <div className="flex h-screen items-center justify-center text-geplano-green font-bold animate-pulse">Carregando site...</div>;

  return (
    <div className="font-sans">
      <Header data={data.header} />
      <Hero data={data.hero} />

      {/* About Section */}
      <Section id="sobre" className="bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
                <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 uppercase mb-6">
                    {data.about.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{data.about.p1}</p>
                <p className="text-gray-600 leading-relaxed">{data.about.p2}</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-8">
                {data.about.stats.map((stat, i) => (
                    <Reveal key={i} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                        <CountUp 
                          value={stat.value} 
                          className="text-3xl lg:text-5xl font-black text-geplano-gold mb-2 block" 
                        />
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                    </Reveal>
                ))}
            </div>
        </div>
      </Section>

      {/* Mission Vision Values */}
      <Section id="essencia" className="bg-gray-100">
        <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 uppercase">{data.mission_vision_values.title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Reveal className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-geplano-gold mb-4">{data.mission_vision_values.mission_title}</h3>
                <p className="text-gray-600 leading-relaxed">{data.mission_vision_values.mission_text}</p>
            </Reveal>
            <Reveal className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-geplano-gold mb-4">{data.mission_vision_values.vision_title}</h3>
                <p className="text-gray-600 leading-relaxed">{data.mission_vision_values.vision_text}</p>
            </Reveal>
            <Reveal className="bg-white p-8 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-geplano-gold mb-4">{data.mission_vision_values.purpose_title}</h3>
                <p className="text-gray-600 leading-relaxed">{data.mission_vision_values.purpose_text}</p>
            </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.mission_vision_values.values_list.map((val, i) => (
                <Reveal key={i} className="bg-white p-6 rounded-lg border-l-4 border-geplano-green shadow-sm hover:shadow-md transition-all">
                    <h4 className="font-bold text-lg text-geplano-green mb-2">{val.title}</h4>
                    <p className="text-sm text-gray-600">{val.text}</p>
                </Reveal>
            ))}
        </div>
      </Section>

      {/* Team */}
      <Section id="equipe" className="bg-white">
          <Reveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 uppercase">{data.team.title}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
              {data.team.members.map((member, i) => (
                  <Reveal key={i} className="text-center group">
                      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-gray-100 group-hover:border-geplano-gold transition-colors duration-300">
                          {/* UPDATED: Added object-top to prevent head cropping */}
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-500" 
                          />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 uppercase">{member.name}</h3>
                      <p className="text-geplano-gold font-bold text-sm mb-3 uppercase tracking-wide">{member.role}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
                  </Reveal>
              ))}
          </div>
      </Section>

      <Solutions data={data.solution} />

      <AppShowcase data={data.differentiators} />

      <Projects data={data.projects} />

      <OtherSolutions data={data.other_solutions} />

      <Contact data={data.contact} />

      <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} {data.footer.copyright}</p>
      </footer>
    </div>
  );
};