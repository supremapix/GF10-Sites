import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import SeoLocation from './components/SeoLocation';
import CtaSection from './components/CtaSection';
import PreFooterBanner from './components/PreFooterBanner';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import CustomCursor from './components/CustomCursor';
import LocationPage from './components/LocationPage';
import CuritibaPage from './components/CuritibaPage';
import Sitemap from './components/Sitemap';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Benefits />
    <Portfolio />
    <Testimonials />
    <FaqSection />
    <SeoLocation />
    <CtaSection />
  </>
);

const App: React.FC = () => {
  const { pathname, hash } = useLocation();

  // Smart Scroll Logic
  useEffect(() => {
    // If there is a hash (e.g., #servicos), try to scroll to it
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: wait a bit for the DOM to be fully ready (useful when navigating from another page)
        const timer = setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // If no hash, implies a new page load or route change to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-secondary/30 selection:text-white cursor-none md:cursor-auto overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criacao-de-sites-curitiba" element={<CuritibaPage />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/bairro/:name" element={<LocationPage type="bairro" />} />
        <Route path="/cidade/:name" element={<LocationPage type="cidade" />} />
      </Routes>

      <PreFooterBanner />
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default App;