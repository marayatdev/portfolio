
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import api from '@/lib/axios';

const Index = () => {

  useEffect(() => {
    document.title = "Marayat Dev | Software Developer";
    const fetchHealth = async () => {
      try {
        const res = await api.get("/health");
        console.log("Health check:", res.data);
      } catch (error) {
        console.error("Error fetching /health:", error);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
