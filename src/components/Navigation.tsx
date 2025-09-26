import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import signatureImg from "@/assets/1000004081-removebg-preview.png";
import SeaTransition from "./SeaTransition";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      setIsMobileMenuOpen(false);
    }, 100);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-elegant' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center focus:outline-none"
            aria-label="Go to top"
          >
            <img
              src={signatureImg}
              alt="Delight Cherubino signature"
              className="h-14 md:h-16 w-auto select-none brightness-0"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-200 font-bold text-lg drop-shadow ${
                  isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-nature-cream'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              className={`transition-all duration-300 font-semibold px-5 py-2 rounded-md ${
                isScrolled
                  ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  : 'border-white text-white bg-white/15 hover:bg-white/25'
              }`}
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left transition-colors duration-200 font-bold text-lg text-foreground hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                className="self-start border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
              >
                Resume
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Sea transition overlay */}
      <SeaTransition isActive={isTransitioning} />
    </nav>
  );
};

export default Navigation;