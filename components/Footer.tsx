import React from 'react';
import { Heart, Instagram, Facebook, Linkedin, Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

const FOOTER_VIDEO_URL = "https://img.supremasite.com.br/omar-seo.mp4";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-white pt-16 pb-10 border-t border-white/10 z-10">
      {/* Background Video with Dark Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-50 contrast-120"
        >
          <source src={FOOTER_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/85 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        
        {/* Top Senior/Elderly-Friendly Contact Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-black border-2 border-emerald-500/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div>
              <span className="text-xs font-black uppercase text-emerald-400 tracking-widest block mb-1">
                Central de Atendimento Curitiba
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Precisa de um site ou suporte? Fale com a gente agora mesmo!
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:col-span-2 justify-end">
              {/* Direct Call Button */}
              <a
                href={CONTACT_INFO.phone}
                className="flex-1 sm:flex-initial py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105"
              >
                <Phone size={22} className="animate-bounce" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold opacity-80">Ligar por Telefone</div>
                  <div className="text-lg font-black">{CONTACT_INFO.displayPhone}</div>
                </div>
              </a>

              {/* Direct WhatsApp Button */}
              <a
                href={CONTACT_INFO.whatsappCommercial}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial py-4 px-6 bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105"
              >
                <MessageCircle size={22} className="fill-black" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold opacity-80">WhatsApp 24 Horas</div>
                  <div className="text-lg font-black">(41) 99272-1004</div>
                </div>
              </a>
            </div>

          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <span className="text-2xl font-black text-white block">
              Suprema<span className="text-emerald-400">Sites</span> Express
            </span>
            <p className="text-gray-300 text-sm leading-relaxed">
              Agência de tecnologia web e SEO Local em Curitiba. Desenvolvimento de sites profissionais, landing pages de alta conversão e posicionamento no topo do Google.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck size={16} />
              <span>Garantia de Qualidade & Atendimento Humanizado</span>
            </div>
            <div className="flex gap-3 pt-2">
              <a href={CONTACT_INFO.socialBio} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black text-gray-200 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={CONTACT_INFO.socialBio} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black text-gray-200 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href={CONTACT_INFO.socialBio} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black text-gray-200 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4 border-b border-emerald-500/40 pb-2 inline-block">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Início</Link></li>
              <li><Link to="/criacao-de-sites-curitiba" className="hover:text-emerald-400 transition-colors text-emerald-300 font-bold">Criação de Sites em Curitiba</Link></li>
              <li><a href="/#servicos" className="hover:text-emerald-400 transition-colors">Nossos Serviços</a></li>
              <li><a href="/#portfolio" className="hover:text-emerald-400 transition-colors">Portfólio de Projetos</a></li>
              <li><a href="/#beneficios" className="hover:text-emerald-400 transition-colors">Vantagens & Benefícios</a></li>
              <li><Link to="/sitemap" className="hover:text-emerald-400 transition-colors">Mapa do Site</Link></li>
            </ul>
          </div>

          {/* Column 3: Priority Neighborhoods */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4 border-b border-emerald-500/40 pb-2 inline-block">
              Atendimento em Curitiba
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><Link to="/bairro/Port%C3%A3o" className="hover:text-emerald-400 transition-colors">Criação de Sites no Portão</Link></li>
              <li><Link to="/bairro/Batel" className="hover:text-emerald-400 transition-colors">Criação de Sites no Batel</Link></li>
              <li><Link to="/bairro/Rebou%C3%A7as" className="hover:text-emerald-400 transition-colors">Criação de Sites no Rebouças</Link></li>
              <li><Link to="/bairro/CIC" className="hover:text-emerald-400 transition-colors">Criação de Sites na CIC</Link></li>
              <li><Link to="/cidade/Curitiba" className="hover:text-emerald-400 transition-colors">Desenvolvimento Web Curitiba</Link></li>
              <li><Link to="/sitemap" className="text-emerald-400 hover:underline font-bold mt-1 block">Ver todos os 80+ Bairros →</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4 border-b border-emerald-500/40 pb-2 inline-block">
              Informações de Contato
            </h4>
            <ul className="space-y-3 text-sm text-gray-300 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span>Curitiba - Paraná e Região Metropolitana</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="text-emerald-400 shrink-0" size={18} />
                <a href={CONTACT_INFO.phone} className="hover:text-emerald-400 transition-colors font-bold text-white">
                  {CONTACT_INFO.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="text-emerald-400 shrink-0" size={18} />
                <a href={CONTACT_INFO.whatsappCommercial} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-bold text-emerald-300">
                  WhatsApp: (41) 99272-1004
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="text-emerald-400 shrink-0" size={18} />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-emerald-400 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-gray-400 pt-1">
                <Clock className="text-emerald-400 shrink-0" size={16} />
                <span>Segunda a Sábado - 08h às 20h</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
          <p className="text-center md:text-left text-xs sm:text-sm">
            &copy; {currentYear} GF10 / Suprema Sites Express. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center gap-2 group text-xs sm:text-sm">
            <span>Desenvolvido</span>
            <Heart className="w-4 h-4 text-red-500 animate-[pulse_0.8s_ease-in-out_infinite] fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <span>por</span>
            <a 
              href="https://supremamidia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-extrabold hover:text-emerald-400 transition-colors tracking-wide flex items-center gap-1"
            >
              Suprema Mídia <ExternalLink size={12} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
