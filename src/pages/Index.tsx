import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Awards from "@/components/Awards";
import SeaParallax from "@/components/SeaParallax";
import AmbientAudio from "@/components/AmbientAudio";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="snap-y snap-mandatory">
        <SeaParallax />
        <AmbientAudio />
        <section id="hero" className="snap-start">
          <Hero />
        </section>
        
        <section id="portfolio" className="snap-start">
          <Portfolio />
        </section>
        
        <section id="achievements" className="snap-start">
          <Awards />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="font-serif text-xl font-bold mb-2">Portfolio</div>
          <p className="text-background/70 text-sm">
            © 2024 Creative Portfolio. Crafted with passion and attention to detail.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
