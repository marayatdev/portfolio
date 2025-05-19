import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="section-container">
        <div className="max-w-3xl animate-fade-in-up fade-in-delay-02">
          <p className="text-teal mb-5 font-mono">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-light mb-4">
            Chawalit Marayat.
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate mb-6">
            I build things for the web.
          </h2>
          <p className="text-slate text-lg mb-8 max-w-xl">
            This DevPortfolio was built with React, Tailwind CSS, Node.js, and MongoDB. It's
            containerized using Docker and deployed with CI/CD pipelines via GitLab, using Nginx as
            the web server. The application is hosted on an AWS EC2 instance.
          </p>
          {/*  <div className="flex flex-wrap gap-4">
            <Button className="bg-transparent border border-teal text-teal hover:bg-teal/10 group">
              <a href="#projects">
                Check out my work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="text-slate-light hover:text-teal hover:bg-navy-light"
            >
              Get in touch
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
