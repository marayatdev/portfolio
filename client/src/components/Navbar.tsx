
import React, { useState, useEffect } from 'react';
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const fetchPdf = async () => {
    try {
      const response = await axios.get('/api/pdf', {
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.log("Error fetching PDF:", error);
    }
  };


  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-teal font-bold text-2xl">Dev<span className="text-slate-light">Portfolio</span></a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="link-underline transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <Button onClick={fetchPdf} className="bg-transparent border border-teal text-teal hover:bg-teal/10">
              Get Resume
            </Button>
          </div>

          <div className="md:hidden">
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              <Menu className="text-teal" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-navy-light border-t border-navy-light`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-slate-light hover:text-teal transition-colors duration-300"
              onClick={toggleMenu}
            >
              {link.name}
            </a>
          ))}
          <div className="px-3 py-2">
            <Button className="w-full bg-transparent border border-teal text-teal hover:bg-teal/10">
              Resume
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
