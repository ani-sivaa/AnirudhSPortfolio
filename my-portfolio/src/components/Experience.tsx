'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCalendarEvent, BsPersonVcard, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!isPaused && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const isGif = (imagePath: string) => imagePath.toLowerCase().endsWith('.gif');

  return (
    <div 
      className="relative w-full h-[400px] rounded-lg overflow-hidden bg-black/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="relative w-full h-full"
        >
          {isGif(images[currentIndex]) ? (
            
            // eslint-disable-next-line @next/next/no-img-element 

            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/75 transition-colors"
          >
            <BsChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/75 transition-colors"
          >
            <BsChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

interface ExperienceItem {
  company: string;
  companyLogo: string;
  period: string;
  role: string;
  description: string;
  achievements: string[];
  images: string[];
  type: string;
  location: string;
  country: 'usa' | 'vietnam';
}

const experiences: ExperienceItem[] = [
  {
    company: "Palantir Technologies",
    companyLogo: "/icons/palantir.svg",
    period: "December 2024 - February 2025",
    role: "Software Engineer fellow",
    description: "Worked with the Palantir AIP and Palantir Foundry to deliver a convenient way for businesses to interact and respond to their customer reviews by building data pipelines and a 'Tinder' like intuitive frontend for auto-generated responses with sentiment analysis",
    achievements: [
      "97% sentiment accuracy",
      "Worked with real Google Review customer data"
    ],
    images: ["/images/ExperienceImages/palantir.jpeg","/images/ExperienceImages/palantir2.png"],
    type: "Part-Time",
    location: "Headquarters",
    country: 'usa'
  },
  {
    company: "Berkshire Hathaway - MedPro",
    companyLogo: "/icons/medpro.svg",
    period: "January 2024 - April 2024",
    role: "Frontend Developer & FOI intern",
    description: "Developed reusuable React frontend components achieving 40% reusability gain and ensured WCAG compliance for web accessibility. https://careers.medpro.com/",
    achievements: [
      "40% reusability gain.",
      "WCAG compliance.",
      "Attended 4 day professional development trip at the Fort Wayne office"
    ],
    images: ["/images/ExperienceImages/medpro1.jpeg","/images/ExperienceImages/medpro2.jpeg"],
    type: "Hybrid",
    location: "Fort Wayne, IN",
    country: 'usa'
  },
  {
    company: "UCSC AEIA Lab",
    companyLogo: "/icons/ucsc.svg",
    period: "September 2024 - February 2025",
    role: "Research Assistant",
    description: "Large Language Models Team: Used swi-prolog with pyswip to feed in LLM generated context and identify hallucinations and logic based errors ",
    achievements: [
      "Reduced hallucination errors by 40%."
    ],
    images: ["/images/ExperienceImages/ucsc.png","/images/ExperienceImages/ucsc2.jpeg"],
    type: "Research",
    location: "UC Santa Cruz",
    country: 'usa'
  }
];

export default function Experience() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (scrollTop === 0 && isScrollingUp) {
        container.style.overflowY = 'hidden';
        return;
      }

      if (scrollTop + clientHeight >= scrollHeight && isScrollingDown) {
        container.style.overflowY = 'hidden';
        return;
      }

      container.style.overflowY = 'auto';
      e.stopPropagation();
    };

    container.addEventListener('wheel', handleScroll);

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, []);
  
  if (!isMounted) return null;

  return (
    <section 
      id="experience" 
      className="w-full min-h-screen relative z-10 mt-20 md:mt-0"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 neon-text">
          Experience
        </h2>
        <div className="space-y-16 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="relative pl-8 border-l-2 border-[#0FF0FC]/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0FF0FC] shadow-[0_0_8px_#0FF0FC]" />
              <div className="mb-12">
                <div className="flex flex-col space-y-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                    <div className="flex-grow max-w-2xl w-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 p-2 border border-[#0FF0FC]/20 shadow-[0_0_12px_#0FF0FC20]">
                          <Image
                            src={exp.companyLogo}
                            alt={exp.company}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold">
                            {exp.company}
                          </h3>
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#0FF0FC]/10 text-[#0FF0FC] border border-[#0FF0FC]/20">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 text-[#0FF0FC] bg-[#0FF0FC]/5 px-4 py-2 rounded-lg border border-[#0FF0FC]/20">
                          <BsCalendarEvent className="text-lg" />
                          <span className="text-sm font-medium">{exp.period}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[#0FF0FC] bg-[#0FF0FC]/5 px-4 py-2 rounded-lg border border-[#0FF0FC]/20">
                          <BsPersonVcard className="text-lg" />
                          <span className="text-sm font-medium">{exp.role}</span>
                        </div>
                      </div>

                      <div className="bg-[#0FF0FC]/5 p-6 rounded-lg border border-[#0FF0FC]/20">
                        <div className="flex items-center gap-2 mb-4">
                          <FaBriefcase className="text-[#0FF0FC] text-lg" />
                          <p className="text-[#0FF0FC] text-lg font-medium">Work</p>
                        </div>
                        <p className="text-[#E0E0E0] text-base lg:text-lg leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-[400px] h-[300px] md:h-[400px]">
                      <ImageSlider images={exp.images} />
                    </div>
                  </div>

                  <ul className="space-y-2 pl-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-[#E0E0E0]/80 relative">
                        <span className="absolute -left-4 top-2 w-2 h-2 rounded-full bg-[#0FF0FC]/50" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}