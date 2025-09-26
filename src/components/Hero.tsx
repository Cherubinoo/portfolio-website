import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import heroImage from "@/assets/hero-mountain-landscape.jpg";
import vid1 from "@/assets/1.mp4";
import resumePdf from "@/assets/delight_cherubino_ml_resume.pdf";
import { useEffect, useRef, useState } from "react";
import ScrollEffects from "./ScrollEffects";
import TypewriterText from "./TypewriterText";
import ParallaxElement from "./ParallaxElement";

const Hero = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Delight_Cherubino_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sequential typewriter: greeting -> name -> tagline, run once
  const greetingToType = "Hey, I'm";
  const nameToType = "Delight Cherubino";
  const taglineToType = "Designing data‑driven experiences that feel fast, smart, and human alike seasports.";

  const [typedGreeting, setTypedGreeting] = useState("");
  const [typedName, setTypedName] = useState("");
  const [typedTagline, setTypedTagline] = useState("");
  const [stage, setStage] = useState<"greeting" | "name" | "tagline" | "done">("greeting");

  const greetingIndexRef = useRef(0);
  const nameIndexRef = useRef(0);
  const taglineIndexRef = useRef(0);

  useEffect(() => {
    if (stage === "done") return;

    let timeoutId: number | undefined;

    const getDelay = (ch: string) => {
      if (stage === "greeting") return ch === " " ? 200 : 80;
      if (stage === "name") return ch === " " ? 180 : 60;
      return ch === " " ? 120 : 40; // tagline - much faster
    };

    const typeStep = () => {
      if (stage === "greeting") {
        const done = greetingIndexRef.current >= greetingToType.length;
        if (!done) {
          const ch = greetingToType[greetingIndexRef.current];
          setTypedGreeting((p) => p + ch);
          greetingIndexRef.current += 1;
          timeoutId = window.setTimeout(typeStep, getDelay(ch));
        } else {
          timeoutId = window.setTimeout(() => setStage("name"), 200);
        }
        return;
      }

      if (stage === "name") {
        const done = nameIndexRef.current >= nameToType.length;
        if (!done) {
          const ch = nameToType[nameIndexRef.current];
          setTypedName((p) => p + ch);
          nameIndexRef.current += 1;
          timeoutId = window.setTimeout(typeStep, getDelay(ch));
        } else {
          timeoutId = window.setTimeout(() => setStage("tagline"), 150);
        }
        return;
      }

      const done = taglineIndexRef.current >= taglineToType.length;
      if (!done) {
        const ch = taglineToType[taglineIndexRef.current];
        setTypedTagline((p) => p + ch);
        taglineIndexRef.current += 1;
        timeoutId = window.setTimeout(typeStep, getDelay(ch));
      } else {
        // finished once
        setStage("done");
      }
    };

    timeoutId = window.setTimeout(typeStep, 100);
    return () => window.clearTimeout(timeoutId);
  }, [stage]);

  // Background video crossfade logic
  const sources = [vid1];
  const fadeMs = 800;
  const [useA, setUseA] = useState(true);
  const [srcA, setSrcA] = useState<string>(sources[0]);
  const [srcB, setSrcB] = useState<string>(sources[0]);
  const nextIndexRef = useRef(0);
  const transitioningRef = useRef(false);
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const active = useA ? videoARef.current : videoBRef.current;
    if (!active) return;
    const onTimeUpdate = () => {
      if (!active || transitioningRef.current || !isFinite(active.duration)) return;
      const remaining = active.duration - active.currentTime;
      if (remaining <= 1.0) {
        transitioningRef.current = true;
        // prepare the next video element
        const nextEl = useA ? videoBRef.current : videoARef.current;
        const nextSrc = sources[nextIndexRef.current];
        if (nextEl) {
          if (useA) setSrcB(nextSrc); else setSrcA(nextSrc);
          // small delay to ensure src swap applies before play
          window.setTimeout(() => {
            nextEl.currentTime = 0;
            nextEl.play().catch(() => {});
            // start crossfade by toggling state after a tick
            window.setTimeout(() => {
              setUseA(!useA);
              // update next index for subsequent cycle
              nextIndexRef.current = (nextIndexRef.current + 1) % sources.length;
              // allow new active to attach its own listener
              window.setTimeout(() => {
                transitioningRef.current = false;
              }, fadeMs + 50);
            }, 20);
          }, 20);
        }
      }
    };
    active.addEventListener('timeupdate', onTimeUpdate);
    // ensure autoplay
    active.play().catch(() => {});
    return () => active.removeEventListener('timeupdate', onTimeUpdate);
  }, [useA]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animate-[fadeInUp_2s_ease-out]">
      {/* Background Videos with crossfade */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoARef}
          key={srcA}
          src={srcA}
          muted
          playsInline
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${useA ? 'opacity-100' : 'opacity-0'}`}
        />
        <video
          ref={videoBRef}
          key={srcB}
          src={srcB}
          muted
          playsInline
          autoPlay
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${useA ? 'opacity-0' : 'opacity-100'}`}
        />
        {/* subtle dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <ScrollEffects effect="fadeIn" delay={200} duration={800}>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span>
              <TypewriterText 
                text={typedGreeting}
                speed={80}
                delay={100}
                className="text-white"
                showCursor={stage === "greeting"}
              />
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-nature-accent tracking-wide">
              <TypewriterText 
                text={typedName}
                speed={60}
                delay={200}
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-nature-accent"
                showCursor={stage === "name"}
              />
            </span>
          </h1>
        </ScrollEffects>
        
        <ScrollEffects effect="slideUp" delay={400} duration={1000}>
          <p className="text-xl md:text-2xl text-nature-cream/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            <TypewriterText 
              text={typedTagline}
              speed={40}
              delay={150}
              className="text-nature-cream/90"
              showCursor={stage === "tagline"}
            />
          </p>
        </ScrollEffects>
        
        <ScrollEffects effect="scale" delay={600} duration={800}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium shadow-nature transition-all duration-300 hover:shadow-warm hover:scale-105"
              onClick={scrollToPortfolio}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={downloadResume}
              className="border-2 border-white text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
          </div>
        </ScrollEffects>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="text-white/70 w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;