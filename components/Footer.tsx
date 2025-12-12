import React from 'react';
import { Heart, Instagram, Facebook, Linkedin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darker border-t border-white/5 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
             <span className="text-2xl font-bold text-white mb-4 block">
              Suprema<span className="text-secondary">Sites</span>
            </span>
            <p className="text-gray-400 max-w-sm mb-6">
              Transformando ideias em negócios digitais de sucesso. Especialistas em web design e performance em Curitiba.
            </p>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.socialBio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href={CONTACT_INFO.socialBio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href={CONTACT_INFO.socialBio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-secondary transition-colors">Início</a></li>
              <li><a href="/#servicos" className="hover:text-secondary transition-colors">Serviços</a></li>
              <li><a href="/#portfolio" className="hover:text-secondary transition-colors">Portfólio</a></li>
              <li><a href="/sitemap" className="hover:text-secondary transition-colors">Mapa do Site</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Curitiba - PR</li>
              <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-secondary">{CONTACT_INFO.email}</a></li>
              <li><a href={CONTACT_INFO.phone} className="hover:text-secondary">{CONTACT_INFO.displayPhone}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; {currentYear} Suprema Sites Express. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-2 group">
            <span>Desenvolvido</span>
            <Heart className="w-5 h-5 text-red-500 animate-[pulse_0.8s_ease-in-out_infinite] fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <span>por</span>
            <a 
              href="https://supremamidia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-extrabold hover:text-secondary transition-colors tracking-wide"
            >
              Suprema Mídia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;