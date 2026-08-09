import React, { useState, useEffect } from 'react';
import { Share2, Phone, MessageCircle, ArrowUp, Copy, Check, X, ExternalLink, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const SHARE_IMAGE_URL = "https://scontent.xx.fbcdn.net/v/t39.105495-1/769309473_1269420531849986_802588083984568899_n.webp?_nc_ht=scontent.xx.fbcdn.net&_nc_cat=102&_nc_ohc=s_3rk247Xz4Q7kNvwFASt7L&sdl=0&ccb=14-4&oh=00_AQFr4ZbFt5q_sNG4suQ-qRSGegdxLAZ4BDXkkAoSK_rGVg&oe=6A7E88E8&_nc_sid=a21977";

export const SHARE_MESSAGES = [
  "Criação de Sites Profissionais e Landing Pages de Alta Conversão com SEO Local em Curitiba",
  "O melhor parceiro para colocar sua empresa no topo do Google em Curitiba e Região Metropolitana!",
  "Procurando desenvolvimento de site rápido, moderno e otimizado? Recomendo a GF10 Suprema Sites!",
  "Agência especialista em SEO Local para empresas no Portão, Batel, Rebouças, CIC e RMC!",
  "Crie sua Landing Page de alta performance com a equipe da GF10 Suprema Sites Express!",
  "Sites institucionais modernos com design exclusivo, carregamento instantâneo e integração com WhatsApp.",
  "Aumente as vendas e orçamentos da sua empresa com um site profissional focado em conversão!",
  "Domine as buscas do Google com estratégias avançadas de SEO Local e geolocalização.",
  "Confira os melhores projetos e cases de criação de sites em Curitiba e Região!",
  "Acelere o crescimento do seu negócio na internet com a GF10 Suprema Sites Express!",
  "Desenvolvimento de sites responsivos, 100% otimizados para celular, Google Ads e Meta Ads.",
  "Sua empresa precisa de mais clientes? Um site profissional da GF10 é o primeiro passo!",
  "Recomendo os serviços de desenvolvimento web e SEO de alta performance da GF10 Suprema Sites!",
  "Design de ponta, velocidade extrema no Google PageSpeed e resultados reais para sua marca.",
  "Soluções completas em criação de sites para indústrias, comércios e profissionais liberais.",
  "Posicione sua empresa no mapa do Google nos bairros Batel, Portão, Rebouças e toda Curitiba!",
  "Agência reconhecida em Curitiba por criar sites modernos e focados em gerar leads qualificados.",
  "Transforme visitantes em clientes fiéis com uma Landing Page profissional e de alta conversão.",
  "Excelente atendimento, suporte dedicado e sites de altíssima qualidade em Curitiba!",
  "Quer vender mais na internet? Conheça as soluções da GF10 Suprema Sites Express!",
  "Tecnologia de ponta em desenvolvimento web em React e Tailwind para o seu negócio se destacar.",
  "Sua presença digital no próximo nível com SEO Local e design estratégico de alta conversão.",
  "A melhor escolha de agência para criação de sites institucionais e lojas em Curitiba!",
  "Potencialize seus resultados no Google e receba mais contatos de clientes no WhatsApp!",
  "Confira a estrutura completa de criação de sites e SEO da GF10 Suprema Sites Express em Curitiba!"
];

const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  // Update current URL and page title
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setPageTitle(document.title || 'GF10 Suprema Sites Express - Criação de Sites em Curitiba');
    }
  }, []);

  // Update page title listener on route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        setCurrentUrl(window.location.href);
        setPageTitle(document.title || 'GF10 Suprema Sites Express');
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [isShareOpen]);

  // Scroll listener for Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 15-second text rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % SHARE_MESSAGES.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeMessage = SHARE_MESSAGES[msgIndex];
  const urlToShare = currentUrl || 'https://www.gf10.com.br';

  const copyTextFormatted = `Estou indicando o melhor GF10 / Suprema Sites Express: ${activeMessage} (${urlToShare})`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(copyTextFormatted);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = copyTextFormatted;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  // Social Share URLs
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${activeMessage} - ${urlToShare}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(activeMessage)}&url=${encodeURIComponent(urlToShare)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(urlToShare)}&media=${encodeURIComponent(SHARE_IMAGE_URL)}&description=${encodeURIComponent(activeMessage)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`,
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(`${activeMessage} ${urlToShare}`)}`,
  };

  return (
    <>
      {/* ----------------- CANTO INFERIOR ESQUERDO: BOTÃO DE COMPARTILHAMENTO ----------------- */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
        {/* POPUP / MENU DE COMPARTILHAMENTO */}
        {isShareOpen && (
          <div className="mb-4 w-[320px] sm:w-[380px] rounded-3xl bg-dark/95 backdrop-blur-2xl border border-blue-500/30 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-white transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 relative overflow-hidden">
            {/* Gradient accent top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-secondary to-indigo-500"></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Share2 className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Compartilhar Página
                  </h3>
                  <p className="text-[11px] text-gray-400">Espalhe esta recomendação nas redes</p>
                </div>
              </div>
              <button
                onClick={() => setIsShareOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar menu de compartilhamento"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Rotating Message Card */}
            <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-secondary animate-spin" style={{ animationDuration: '6s' }} />
                  Recomendação Ativa (Muda a cada 15s)
                </span>
                <span className="text-[10px] text-gray-400 font-mono bg-white/10 px-1.5 py-0.5 rounded-md">
                  #{msgIndex + 1}/25
                </span>
              </div>
              <p className="text-xs text-gray-200 font-medium leading-relaxed italic">
                "{activeMessage}"
              </p>
            </div>

            {/* Social Share Buttons Grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {/* WhatsApp */}
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/25 hover:border-[#25D366] transition-all group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-[#25D366] group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-[11px] font-semibold text-gray-200">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/25 hover:border-[#1877F2] transition-all group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-[#1877F2] group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-[11px] font-semibold text-gray-200">Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/50 transition-all group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-white group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-[11px] font-semibold text-gray-200">Twitter (X)</span>
              </a>

              {/* Pinterest */}
              <a
                href={shareLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#E60023]/10 border border-[#E60023]/30 hover:bg-[#E60023]/25 hover:border-[#E60023] transition-all group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-[#E60023] group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
                <span className="text-[11px] font-semibold text-gray-200">Pinterest</span>
              </a>

              {/* LinkedIn */}
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 hover:bg-[#0A66C2]/25 hover:border-[#0A66C2] transition-all group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-[#0A66C2] group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span className="text-[11px] font-semibold text-gray-200">LinkedIn</span>
              </a>

              {/* Threads */}
              <a
                href={shareLinks.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/25 hover:border-purple-400 transition-all group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-purple-300 group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 13.197c-.126 2.378-1.523 4.156-3.832 4.156-1.76 0-3.083-1.071-3.32-2.716h-.066c-.66 1.636-2.073 2.716-3.827 2.716-2.185 0-3.722-1.635-3.722-3.83 0-2.615 2.128-4.321 5.388-4.321h2.147v-.363c0-1.32-.825-2.012-2.211-2.012-1.122 0-2.145.429-2.838 1.155l-1.056-1.155c1.089-1.089 2.574-1.683 4.125-1.683 2.607 0 4.18 1.485 4.18 3.861v3.828c0 .825.33 1.188 1.089 1.188.759 0 1.353-.627 1.452-1.782h1.586zm-5.775.132v-1.386h-1.947c-1.848 0-2.871.858-2.871 2.211 0 1.122.759 1.881 1.848 1.881 1.584 0 2.97-1.122 2.97-2.706z"/>
                </svg>
                <span className="text-[11px] font-semibold text-gray-200">Threads</span>
              </a>
            </div>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 border ${
                copied
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-white/20 shadow-lg'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  <span>Link Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Link da Página</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* FLOATING TRIGGER BUTTON */}
        <button
          onClick={() => setIsShareOpen(!isShareOpen)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:shadow-[0_0_35px_rgba(37,99,235,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 overflow-hidden"
          aria-label="Compartilhar esta página"
        >
          {/* Pulsing Outer Ring */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping group-hover:opacity-100"></div>

          {/* Shimmer Light */}
          <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine"></div>

          <Share2 className="w-6 h-6 relative z-10 text-white group-hover:rotate-12 transition-transform duration-300" />

          {/* Tooltip on Hover */}
          <span className="absolute left-16 bg-dark/95 border border-blue-500/30 text-white py-1.5 px-3 rounded-xl shadow-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none hidden sm:flex items-center gap-1.5 backdrop-blur-md">
            <Share2 className="w-3.5 h-3.5 text-secondary" />
            Compartilhar Site
          </span>
        </button>
      </div>


      {/* ----------------- CANTO INFERIOR DIREITO: CONTATO RÁPIDO E VOLTAR AO TOPO ----------------- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5">
        {/* VOLTAR AO TOPO (Back to Top) */}
        <button
          onClick={scrollToTop}
          className={`group flex items-center justify-center w-11 h-11 bg-dark/90 backdrop-blur-md border border-white/20 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-blue-400 transition-all duration-300 ${
            showScrollTop
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
          aria-label="Voltar ao topo da página"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform" />
          <span className="absolute right-14 bg-dark/95 border border-white/10 text-white py-1 px-3 rounded-xl shadow-xl text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:inline-block">
            Voltar ao Topo
          </span>
        </button>

        {/* LIGAR AGORA (tel:) */}
        <a
          href={CONTACT_INFO.phone}
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
          aria-label="Ligar Agora"
        >
          {/* Subtle Ring */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-pulse"></div>

          <Phone className="w-6 h-6 text-white relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />

          {/* Hover Badge */}
          <span className="absolute right-16 bg-dark/95 border border-blue-500/30 text-white py-1.5 px-3 rounded-xl shadow-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none hidden sm:flex items-center gap-1.5 backdrop-blur-md">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            Ligar Agora: {CONTACT_INFO.displayPhone}
          </span>
        </a>

        {/* WHATSAPP 24H */}
        <a
          href={CONTACT_INFO.whatsappCommercial}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:shadow-[0_0_35px_rgba(16,185,129,0.9)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 overflow-visible"
          aria-label="WhatsApp 24h"
        >
          {/* Pulsing Light Effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-100"></div>

          {/* Online Indicator Badge */}
          <div className="absolute -top-1 -right-1 z-20 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-dark shadow-md"></span>
          </div>

          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 animate-pulse group-hover:rotate-12 transition-transform" />

          {/* Tooltip / Badge */}
          <span className="absolute right-18 bg-dark/95 border border-emerald-500/40 text-white py-2 px-3.5 rounded-2xl shadow-2xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none hidden sm:flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            WhatsApp 24h - Online Agora
          </span>
        </a>
      </div>
    </>
  );
};

export default FloatingActions;
