import React from 'react';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const PRE_FOOTER_IMAGE_URL = "https://scontent.xx.fbcdn.net/v/t39.105495-1/769309473_1269420531849986_802588083984568899_n.webp?_nc_ht=scontent.xx.fbcdn.net&_nc_cat=102&_nc_ohc=s_3rk247Xz4Q7kNvwFASt7L&sdl=0&ccb=14-4&oh=00_AQFr4ZbFt5q_sNG4suQ-qRSGegdxLAZ4BDXkkAoSK_rGVg&oe=6A7E88E8&_nc_sid=a21977";

const PreFooterBanner: React.FC = () => {
  return (
    <section 
      aria-label="GF10 Suprema Sites Express - Criação de Sites e SEO em Curitiba"
      className="relative z-10 bg-darker border-t border-white/10 py-12 md:py-16 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-secondary/15 to-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              GF10 Suprema Sites Express &bull; Curitiba e Região
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Especialistas em <span className="text-gradient">Criação de Sites e SEO Local</span>
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mb-8 leading-relaxed font-light">
            Sua empresa em destaque no Google com sites modernos, velozes e preparados para transformar visitantes em novos clientes. Atendimento exclusivo no Batel, Portão, Rebouças, CIC e toda a Região Metropolitana de Curitiba.
          </p>

          {/* Featured Banner Image */}
          <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/15 bg-white/5 p-2 md:p-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all hover:border-secondary/40 group">
            <div className="relative rounded-2xl overflow-hidden bg-black/40">
              <img
                src={PRE_FOOTER_IMAGE_URL}
                alt="GF10 Suprema Sites Express - Criação de Sites e SEO em Curitiba"
                title="GF10 Suprema Sites Express"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Key Selling Points */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Garantia de Qualidade &amp; Performance
            </span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-secondary" />
              SEO Otimizado para o Google
            </span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Design 100% Responsivo
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PreFooterBanner;
