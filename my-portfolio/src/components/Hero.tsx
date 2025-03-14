'use client';

import { motion } from 'framer-motion';
import { FaLaptopCode, FaCode, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import Image from 'next/image';

const techStack = [
  { icon: FaCode, name: 'Full Stack Developer', href: '#projects' },
  { icon: FaLaptopCode, name: 'Skill Set', href: '#skills' },
];

export default function Hero() {
  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center relative z-10 mb-20 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 order-2 md:order-1"
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-4">
              Hi, I&apos;m <span className="text-[#0FF0FC]">Anirudh Sivakumar</span>
            </h1>
            <p className="text-base md:text-xl mb-6 text-[#E0E0E0]/80">
              A passionate Computer Science graduate from UC Santa Cruz specializing in full-stack development and machine learning. I build immersive web experiences and intelligent systems that solve real-world problems.
            </p>
            
            <div className="mt-8">
              <p className="text-sm text-[#E0E0E0]/60 mb-4">Currently exploring the intersection between AI and Agriculture</p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {techStack.map(({ icon: Icon, name, href }) => (
                  <button
                    key={name}
                    onClick={() => handleClick(href)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#555555]/20 hover:bg-[#555555]/30 transition-colors cursor-pointer hover:-translate-y-1 transform duration-300"
                  >
                    <Icon className="text-[#0FF0FC] text-lg" />
                    <span className="text-xs md:text-sm font-medium">{name}</span>
                  </button>
                ))}
              </motion.div>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <a
                  href="https://github.com/ani-sivaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E0E0E0]/80 hover:text-[#0FF0FC] transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/anisiva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E0E0E0]/80 hover:text-[#0FF0FC] transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a href="mailto:anisiva213@gmail.com" 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0FF0FC]/10 hover:bg-[#0FF0FC]/20 text-[#0FF0FC] transition-colors">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0FF0FC]/10 hover:bg-[#0FF0FC]/20 text-[#0FF0FC] transition-colors">
                    <FaPhone />
                    <span>Contact</span>
                  </button>
                </a>
              </div>
            </div>
          </motion.div>

          <div className="order-1 md:order-2 relative h-[300px] md:h-[500px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0FF0FC]/5 blur-[100px] rounded-full" />
            <motion.div
              className="absolute w-[280px] h-[380px] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(15,240,252,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 30 }}
            >
              <div className="relative w-full h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0FF0FC]/20 via-transparent to-[#5856D6]/20 z-10 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-xl z-20">
                  <div className="absolute inset-0 rounded-xl border border-[#0FF0FC]/30 shadow-[inset_0_0_15px_rgba(15,240,252,0.2)] transition-all duration-300" />
                </div>
                <Image
                  src="/images/face/image.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}