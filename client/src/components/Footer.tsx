
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-navy border-t border-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate text-sm mb-4 md:mb-0">
            &copy; {currentYear} Marayat Dev. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-slate hover:text-teal transition-colors duration-300">
              <Github size={18} />
            </a>
            <a href="#" className="text-slate hover:text-teal transition-colors duration-300">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-slate hover:text-teal transition-colors duration-300">
              <Linkedin size={18} />
            </a>
            <a href="mailto:john.doe@example.com" className="text-slate hover:text-teal transition-colors duration-300">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
