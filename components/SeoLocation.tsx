import React, { useRef, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEIGHBORHOODS, CITIES } from '../constants';

const SeoLocation: React.FC = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        const scroll = () => {
          if (ref.current) {
            if (ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight) {
              ref.current.scrollTop = 0;
            } else {
              ref.current.scrollTop += 1;
            }
          }
        };
        const intervalId = setInterval(scroll, 50);
        return () => clearInterval(intervalId);
      }
    };

    const cleanup1 = scrollContainer(scrollRef1);
    const cleanup2 = scrollContainer(scrollRef2);

    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

  return (
    <section className="py-24 bg-dark border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 justify-center mb-6 px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            <MapPin size={16} className="animate-pulse" />
            <span className="uppercase tracking-widest text-xs font-bold">Atendimento Regional</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Líder em Criação de Sites em <span className="text-white">Curitiba</span> e Região
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            A Suprema Sites Express é especialista em desenvolvimento web focado em SEO Local. 
            Ajudamos empresas a dominarem as buscas do Google em sua região.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Neighborhoods Column */}
          <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors flex flex-col h-[400px]">
            <div className="flex items-center gap-3 mb-6 shrink-0">
              <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                <Navigation size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Bairros de Curitiba</h3>
            </div>
            
            <div 
              ref={scrollRef1}
              className="flex flex-wrap gap-2 overflow-y-auto pr-2 no-scrollbar mask-image-linear-gradient"
            >
              {NEIGHBORHOODS.map((neighborhood, i) => (
                <Link 
                  key={i} 
                  to={`/bairro/${encodeURIComponent(neighborhood)}`}
                  className="px-3 py-1 bg-white/5 rounded-md text-sm text-gray-300 border border-white/5 hover:border-secondary/30 hover:text-white hover:bg-secondary/10 transition-colors"
                >
                  {neighborhood}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-center shrink-0">
               <Link to="/sitemap" className="text-sm text-primary hover:text-white transition-colors font-medium">Ver lista completa</Link>
            </div>
          </div>

          {/* Cities Column */}
          <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors flex flex-col h-[400px]">
            <div className="flex items-center gap-3 mb-6 shrink-0">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Região Metropolitana</h3>
            </div>
            
            <div 
               ref={scrollRef2}
               className="flex flex-wrap gap-2 overflow-y-auto pr-2 no-scrollbar"
            >
              {CITIES.map((city, i) => (
                <Link 
                  key={i} 
                  to={`/cidade/${encodeURIComponent(city)}`}
                  className="px-3 py-1 bg-white/5 rounded-md text-sm text-gray-300 border border-white/5 hover:border-primary/30 hover:text-white hover:bg-primary/10 transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-center shrink-0">
               <Link to="/sitemap" className="text-sm text-primary hover:text-white transition-colors font-medium">Ver lista completa</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoLocation;