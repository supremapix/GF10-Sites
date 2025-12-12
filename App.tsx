import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import SeoLocation from './components/SeoLocation';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CustomCursor from './components/CustomCursor';
import LocationPage from './components/LocationPage';
import Sitemap from './components/Sitemap';

const HomePage: React.FC = () => (
  <>
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

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-secondary/30 selection:text-white cursor-none md:cursor-auto overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/bairro/:name" element={<LocationPage type="bairro" />} />
        <Route path="/cidade/:name" element={<LocationPage type="cidade" />} />
      </Routes>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default App;