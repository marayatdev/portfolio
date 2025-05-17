import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="section-container">
        <div className="max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-teal mb-5 font-mono">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-light mb-4">
            Chawalit Marayat.
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate mb-6">
            I build things for the web.
          </h2>
          <p className="text-slate text-lg mb-8 max-w-xl">
            I'm a junior software developer with a passion for building user-friendly and accessible digital experiences. I'm currently focused on learning best practices and contributing to projects that put people first.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-transparent border border-teal text-teal hover:bg-teal/10 group">
              Check out my work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="ghost"
              className="text-slate-light hover:text-teal hover:bg-navy-light"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
