'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaBriefcase, FaProjectDiagram, FaLaptopCode } from 'react-icons/fa';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home', icon: FaHome },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'skills', label: 'Skills', icon: FaLaptopCode }
  ];

  useEffect(() => {
    const observers = [];
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(callback, options);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, [sections]);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-[#1A1A1A]/90 backdrop-blur-lg py-8 px-3 rounded-2xl border border-[#0FF0FC]/20 shadow-[0_0_20px_rgba(15,240,252,0.3)]">
        <ul className="flex flex-col items-center gap-6 w-20">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            
            return (
              <motion.li 
                key={section.id}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: isActive ? 1 : 0.7,
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`
                    flex flex-col items-center justify-center gap-2 p-3 rounded-xl w-full transition-all duration-300
                    ${isActive 
                      ? 'bg-[#0FF0FC]/20 border border-[#0FF0FC]/50 shadow-[0_0_10px_rgba(15,240,252,0.3)]' 
                      : 'bg-transparent border border-transparent hover:bg-[#0FF0FC]/10 hover:border-[#0FF0FC]/20'}
                  `}
                  aria-label={section.label}
                >
                  <motion.div
                    className={`text-xl ${isActive ? 'text-[#0FF0FC]' : 'text-[#999999]'}`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <section.icon />
                  </motion.div>
                  
                  <span 
                    className={`text-xs font-medium text-center leading-tight ${
                      isActive 
                        ? 'text-[#0FF0FC]' 
                        : 'text-[#E0E0E0]'
                    }`}
                  >
                    {section.label}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;