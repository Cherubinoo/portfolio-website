import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Awards from "@/components/Awards";
import SeaParallax from "@/components/SeaParallax";
import AmbientAudio from "@/components/AmbientAudio";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Smooth fade-in effect when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Navigation />
      
      <main className="snap-y snap-mandatory">
        <AmbientAudio />
        <section id="hero" className="snap-start">
          <Hero />
        </section>
        
        {/* Featured Projects - Portfolio Section */}
        <section id="portfolio" className="snap-start relative">
          <SeaParallax />
          <Portfolio />
        </section>
        
        {/* Achievements Section */}
        <section id="achievements" className="snap-start relative">
          <Awards />
        </section>
        
        {/* About Me Section */}
        <section id="about" className="relative">
          <SeaParallax />
          <About />
        </section>
        
        {/* Let's Work Together - Contact Section */}
        <section id="contact" className="relative">
          <SeaParallax />
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="font-serif text-xl font-bold mb-2">Portfolio</div>
          <p className="text-background/70 text-sm">
            © 2025 delightcherubino. Crafted with passion and attention to detail.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
