import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, Zap, Search, MessageCircle, ChevronRight, Shield, Rocket, Monitor, Layout, ArrowRight, Building, Award, Check } from 'lucide-react';
import { CONTACT_INFO, NEIGHBORHOODS, CITIES, PRIORITY_NEIGHBORHOODS_DATA } from '../constants';
import FaqSection, { MAIN_FAQS } from './FaqSection';

const CuritibaPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    neighborhood: 'Curitiba',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, meu nome é *${formData.name}* (${formData.company || 'Empresa'}).%0A` +
                 `Telefone: *${formData.phone}*.%0A` +
                 `Localidade: *${formData.neighborhood} - Curitiba*.%0A` +
                 `Mensagem: ${formData.message || 'Gostaria de um orçamento para criação de site.'}`;
    window.open(`https://wa.me/5541992721004?text=${text}`, '_blank');
  };

  const canonicalUrl = "https://www.gf10.com.br/criacao-de-sites-curitiba";

  return (
    <>
      <Helmet>
        <title>Criação de Sites em Curitiba | Empresa de Desenvolvimento Web GF10</title>
        <meta name="description" content="Especialista em Criação de Sites em Curitiba e Região. Desenvolvemos sites profissionais, rápidos e otimizados para o Google no Portão, Batel, Rebouças, CIC e todos os bairros." />
        <meta name="keywords" content="criação de sites em curitiba, empresa de criação de sites em curitiba, agência de criação de sites curitiba, desenvolvimento de sites curitiba, site profissional curitiba, desenvolvimento web curitiba" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Criação de Sites Profissionais em Curitiba | GF10 Suprema Sites" />
        <meta property="og:description" content="Aumente as vendas da sua empresa com sites velozes, modernos e no topo das buscas do Google em Curitiba." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />

        {/* JSON-LD Schema.org Graph */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  "@id": "${canonicalUrl}#breadcrumb",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Início",
                      "item": "https://www.gf10.com.br/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Criação de Sites em Curitiba",
                      "item": "${canonicalUrl}"
                    }
                  ]
                },
                {
                  "@type": "WebPage",
                  "@id": "${canonicalUrl}#webpage",
                  "url": "${canonicalUrl}",
                  "name": "Criação de Sites em Curitiba | Empresa de Desenvolvimento Web",
                  "isPartOf": {
                    "@id": "https://www.gf10.com.br/#website"
                  },
                  "breadcrumb": {
                    "@id": "${canonicalUrl}#breadcrumb"
                  },
                  "inLanguage": "pt-BR",
                  "description": "Serviço especializado de criação de sites profissionais e landing pages em Curitiba e Região Metropolitana."
                },
                {
                  "@type": "Service",
                  "@id": "${canonicalUrl}#service",
                  "name": "Criação de Sites Profissionais em Curitiba",
                  "provider": {
                    "@id": "https://www.gf10.com.br/#organization"
                  },
                  "areaServed": {
                    "@type": "City",
                    "name": "Curitiba"
                  },
                  "description": "Desenvolvimento de sites institucionais, landing pages e otimização de SEO Local para empresas de Curitiba.",
                  "serviceType": "Desenvolvimento Web & SEO"
                },
                {
                  "@type": "FAQPage",
                  "@id": "${canonicalUrl}#faq",
                  "mainEntity": [
                    ${MAIN_FAQS.map(faq => `
                      {
                        "@type": "Question",
                        "name": ${JSON.stringify(faq.question)},
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": ${JSON.stringify(faq.answer)}
                        }
                      }
                    `).join(',')}
                  ]
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="bg-darker min-h-screen pt-28 pb-16 text-gray-200">
        
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <ChevronRight size={12} />
            <span className="text-white font-medium">Criação de Sites em Curitiba</span>
          </nav>
        </div>

        {/* Hero Banner */}
        <section className="relative py-16 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-darker to-darker z-0" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
            >
              <MapPin size={14} className="text-secondary animate-pulse" />
              <span>Autoridade Regional em Curitiba</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto"
            >
              Criação de Sites Profissionais em <span className="text-gradient">Curitiba</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
            >
              Desenvolvimento de sites rápidos, modernos e otimizados para o Google. Fortaleça sua marca no <strong>Portão, Batel, Rebouças, CIC</strong> e em todos os bairros de Curitiba.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-300"
            >
              <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10"><CheckCircle size={16} className="text-secondary" /> PageSpeed 95+</span>
              <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10"><CheckCircle size={16} className="text-secondary" /> SEO Local Incluso</span>
              <span className="flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10"><CheckCircle size={16} className="text-secondary" /> Suporte Humanizado</span>
            </motion.div>

          </div>
        </section>

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Editorial Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            <article className="prose prose-invert prose-lg max-w-none space-y-8">
              
              {/* Introduction */}
              <section className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <Monitor className="text-primary" />
                  A Importância de um Site Profissional para Empresas de Curitiba
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Curitiba é uma das cidades mais inteligentes e dinâmicas do Brasil, abrigando um mercado corporativo altamente competitivo. Se a sua empresa não possui um site moderno e otimizado para o Google, você está perdendo diariamente dezenas de potenciais clientes para a concorrência.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  A <strong>GF10 / Suprema Sites Express</strong> desenvolve infraestruturas digitais de alta performance, unindo design sofisticado e engenharia web de ponta. Atendemos empresários, profissionais liberais, indústrias e prestadores de serviços no <strong>Portão, Batel, Rebouças, CIC</strong> e em toda a Região Metropolitana de Curitiba.
                </p>
              </section>

              {/* Priority Neighborhoods Spotlight */}
              <section className="space-y-6">
                <div className="border-l-4 border-secondary pl-4">
                  <h2 className="text-3xl font-bold text-white">Atendimento Prioritário nos Principais Polos de Curitiba</h2>
                  <p className="text-gray-400 text-sm mt-1">Soluções personalizadas respeitando as características econômicas de cada região:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(PRIORITY_NEIGHBORHOODS_DATA).map(([name, data]) => (
                    <div key={name} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-secondary/40 transition-all">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">Bairro {name}</span>
                          <MapPin size={16} className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{data.tagline}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{data.intro}</p>
                      </div>
                      <Link 
                        to={`/bairro/${encodeURIComponent(name)}`} 
                        className="inline-flex items-center gap-1.5 text-secondary font-bold text-sm hover:underline mt-2"
                      >
                        Ver detalhes do atendimento no {name} <ChevronRight size={16} />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Development Process */}
              <section className="bg-gradient-to-br from-dark to-darker p-8 rounded-3xl border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Rocket className="text-accent" />
                  Como Funciona Nosso Processo de Criação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <span className="text-3xl font-black text-primary mb-2 block">01</span>
                    <h3 className="text-lg font-bold text-white mb-2">Briefing & Alinhamento</h3>
                    <p className="text-gray-400 text-sm">Analisamos seu modelo de negócio em Curitiba, público-alvo e concorrentes locais para alinhar a proposta visual.</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <span className="text-3xl font-black text-secondary mb-2 block">02</span>
                    <h3 className="text-lg font-bold text-white mb-2">Design UI/UX & Código</h3>
                    <p className="text-gray-400 text-sm">Desenvolvemos o layout responsivo em React e Tailwind CSS, garantindo velocidade máxima e visual marcante.</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <span className="text-3xl font-black text-accent mb-2 block">03</span>
                    <h3 className="text-lg font-bold text-white mb-2">SEO Local & Metadados</h3>
                    <p className="text-gray-400 text-sm">Configuramos meta tags, Schema.org em JSON-LD e links internos para posicionar sua empresa no Google em Curitiba.</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <span className="text-3xl font-black text-yellow-400 mb-2 block">04</span>
                    <h3 className="text-lg font-bold text-white mb-2">Publicação & Suporte</h3>
                    <p className="text-gray-400 text-sm">Inauguramos seu site com certificado SSL e integração ao WhatsApp, oferecendo suporte contínuo.</p>
                  </div>
                </div>
              </section>

              {/* Local SEO Strategy */}
              <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <Search className="text-secondary" />
                  Estratégia de SEO Local para o Mercado Curitibano
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  O algoritmo do Google valoriza fortemente a relevância geolocalizada. Quando um cliente pesquisa "advogado no Batel", "clínica no Portão", "agência de tecnologia no Rebouças" ou "indústria na CIC", o buscador analisa o código e as entidades presentes no seu site.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
                    <span><strong>Marcação Schema.org em @graph:</strong> Conectamos sua empresa como entidade física e comercial em Curitiba.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
                    <span><strong>Carregamento em Milissegundos:</strong> Sites rápidos diminuem a taxa de rejeição e elevam o índice de qualidade nos anúncios.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
                    <span><strong>Integração com Google Meu Negócio:</strong> Alinhamento total entre seu site e seu perfil comercial no Google Maps.</span>
                  </li>
                </ul>
              </section>

              {/* All Neighborhoods List */}
              <section className="bg-dark p-8 rounded-3xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">Bairros de Curitiba Atendidos</h2>
                <p className="text-gray-400 text-sm mb-6">Oferecemos desenvolvimento web personalizado em todos os bairros da capital paranaense:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                  {NEIGHBORHOODS.slice(0, 36).map((item, i) => (
                    <Link
                      key={i}
                      to={`/bairro/${encodeURIComponent(item)}`}
                      className="p-2 bg-white/5 rounded text-gray-300 hover:text-secondary hover:bg-secondary/10 transition-colors truncate"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link to="/sitemap" className="text-sm text-primary hover:underline font-bold">Ver todos os 80+ bairros no Mapa do Site →</Link>
                </div>
              </section>

            </article>

          </div>

          {/* Sidebar Contact Form & CTAs */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              
              {/* WhatsApp Quote Box */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-primary to-accent" />
                
                <h3 className="text-2xl font-bold text-white mb-2">Orçamento Rápido em Curitiba</h3>
                <p className="text-gray-400 text-sm mb-6">Fale direto com nossa equipe via WhatsApp e receba uma proposta sem compromisso.</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Seu Nome *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-darker/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Nome da Empresa / Negócio</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-darker/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                      placeholder="Ex: Minha Empresa"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Telefone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-darker/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                      placeholder="(41) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Bairro / Região em Curitiba</label>
                    <select
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      className="w-full bg-darker/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors text-sm"
                    >
                      <option value="Curitiba Geral">Curitiba (Geral)</option>
                      <option value="Portão">Portão</option>
                      <option value="Batel">Batel</option>
                      <option value="Rebouças">Rebouças</option>
                      <option value="CIC">CIC (Cidade Industrial)</option>
                      <option value="Água Verde">Água Verde</option>
                      <option value="Bigorrilho">Bigorrilho</option>
                      <option value="Centro">Centro</option>
                      <option value="Outro Bairro">Outro Bairro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Mensagem (Opcional)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-darker/70 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors h-24 resize-none text-sm"
                      placeholder="Preciso de um site para minha empresa de..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg group cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                    Solicitar via WhatsApp
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                  <p className="text-xs text-gray-400 mb-1">Ou ligue diretamente:</p>
                  <a href={CONTACT_INFO.phone} className="text-lg font-bold text-white hover:text-primary transition-colors">
                    {CONTACT_INFO.displayPhone}
                  </a>
                </div>
              </div>

              {/* Direct Info Card */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Shield className="text-secondary shrink-0" size={18} />
                  <span>Código seguro & SSL Grátis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-primary shrink-0" size={18} />
                  <span>Atendimento dedicado em Curitiba</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="text-yellow-400 shrink-0" size={18} />
                  <span>PageSpeed otimizado para o Google</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <FaqSection 
            title="Perguntas Frequentes sobre Criação de Sites em Curitiba"
            subtitle="Respostas diretas sobre desenvolvimento web, prazos e resultados no Google"
          />
        </div>

      </div>
    </>
  );
};

export default CuritibaPage;
