import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";
import { useRef } from "react";

const awards = [
  { icon: Trophy, title: "top 1 paper presentation in fx, Nellai, 2023", subtitle: "Winner", desc: "presented paper on cancer detection using image processing" },
  { icon: Medal, title: "Best team Award in Hackathon at Shri Easwar College of Engineering, Coimbatore", subtitle: "Best Team", desc: "optimisation of tax paymnt and insight using llm and webscraping" },
  { icon: Crown, title: "24hrs Hackathon winner at Kamarajar College of Engineering, Viruthunagar ", subtitle: "Winner", desc: "Image processing and integrated alert system for ppe and industrail saftey" },
  { icon: Crown, title: "Arising star data science", subtitle: "Arising star", desc: "Best Performer of the year" },
];

const Awards = () => {
  // Simple 3D tilt on mouse move
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10; // -5..5 deg
    const rotateX = (0.5 - (y / rect.height)) * 10; // -5..5 deg
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleLeave = (index: number) => {
    const el = cardRefs.current[index];
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-sky-200/40 via-sky-100 to-background dark:from-sky-900/20 dark:via-sky-900/10 dark:to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Awards & Honors</h2>
          <p className="text-muted-foreground mt-3">Milestones from voyages across tech seas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map(({ icon: Icon, title, subtitle, desc }, idx) => (
            <Card
              key={title}
              ref={(el) => (cardRefs.current[idx] = el)}
              onMouseMove={(e) => handleMove(idx, e)}
              onMouseLeave={() => handleLeave(idx)}
              className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm animate-fade-in-up transition-transform duration-150 will-change-transform"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-sky-300 to-cyan-300 text-sky-950 dark:from-sky-700 dark:to-cyan-700 dark:text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-serif text-xl">{title}</div>
                    <div className="text-xs text-muted-foreground">{subtitle}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;


