import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <section id="hero" className="snap-start h-screen w-full">
        <Hero />
      </section>
      <section id="experience" className="snap-start h-screen w-full">
        <Experience />
      </section>
      <section id="projects" className="snap-start h-screen w-full">
        <Projects />
      </section>
      <section id="skills" className="snap-start h-screen w-full">
        <Skills />
      </section>
    </main>
  );
}