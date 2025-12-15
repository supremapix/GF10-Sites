import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Benefits from './Benefits';
import Portfolio from './Portfolio';
import Testimonials from './Testimonials';
import SeoLocation from './SeoLocation';
import CtaSection from './CtaSection';
import EnhancedSEO from './EnhancedSEO';

const HomePage: React.FC = () => (
  <>
    <EnhancedSEO
      title="Criação de Sites Profissionais em Curitiba | Suprema Sites Express"
      description="Agência de criação de sites profissionais e landing pages em Curitiba e Região Metropolitana. Sites rápidos, modernos e otimizados para Google. Transforme seu negócio com presença digital de alta conversão."
      canonicalUrl="/"
      keywords="criação de sites curitiba, web designer curitiba, landing page curitiba, sites profissionais, desenvolvimento web curitiba, SEO curitiba, marketing digital curitiba"
    />
    <Hero />
    <About />
    <Services />
    <Benefits />
    <Portfolio />
    <Testimonials />
    <SeoLocation />
    <CtaSection />
  </>
);

export default HomePage;
