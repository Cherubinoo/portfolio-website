import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-mountain-landscape.jpg";

const Portfolio = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      role: "Project Intern",
      company: "Igress Solutions LLP, Bangalore (Remote)",
      period: "Nov 2023 – Dec 2023",
      highlights: ["Prototype delivery", "Remote collaboration", "Rapid iterations"],
    },
    {
      id: 2,
      role: "Project Development Intern (AI)",
      company: "Ramco Cements, Ariyalur",
      period: "May 2024 – Aug 2024",
      highlights: ["AI for industry", "Data pipelines", "Model deployment"],
    },
    {
      id: 3,
      role: "AI Processing & Development",
      company: "RIT ERP",
      period: "Present",
      highlights: ["ERP automations", "Processing pipelines", "APIs & integrations"],
    },
    {
      id: 4,
      role: "ML Project Intern",
      company: "Ramco Schools",
      period: "Aug 2025 – Present",
      highlights: ["Education ML", "Model experimentation", "Insights dashboards"],
    },
  ];

  const imageBase = "/src/assets"; // using local assets folder

  const projects = [
    {
      id: 1,
      title: "Igress Solutions – Sales Forecast & BI",
      description: "Data visualisation in Power BI with forecasting tools for Amazon sales; dashboards and predictive insights.",
      image: `${imageBase}/igress.jpg`,
      category: "Analytics / BI",
      technologies: ["Power BI", "Python", "ETL", "Forecasting"],
      type: "Data Visualization"
    },
    {
      id: 2,
      title: "Ramco Cements – Human Detection (Entry)",
      description: "AI-based human detection at factory entry using YOLOv8 to log authorized personnel.",
      image: `${imageBase}/ramco-human.jpg`,
      category: "Computer Vision",
      technologies: ["YOLOv8", "OpenCV", "Python"],
      type: "AI/ML"
    },
    {
      id: 3,
      title: "Water Level & Supply Prediction",
      description: "ML models for water resource forecasting with resource management; packaged as Windows executables and deployed.",
      image: `${imageBase}/water.jpg`,
      category: "ML Ops",
      technologies: ["Scikit-learn", "XGBoost", "PyInstaller"],
      type: "Prediction"
    },
    {
      id: 4,
      title: "PPE Detection + IoT Alerts",
      description: "Safety PPE detection for industrial sites with IoT siren/notify and automated email alerts; delivered as EXE.",
      image: `${imageBase}/ppe.jpg`,
      category: "AI + IoT",
      technologies: ["YOLO", "Flask", "SMTP", "IoT"],
      type: "Safety"
    },
    {
      id: 5,
      title: "LLM on AWS – Question Paper Generator",
      description: "Generates CBSE class 3–12 question papers across subjects and languages using AWS-hosted LLM stack.",
      image: `${imageBase}/llm.jpg`,
      category: "Generative AI",
      technologies: ["AWS", "LLM", "Prompting", "API"],
      type: "LLM"
    },
    {
      id: 6,
      title: "ERP + AI Insights Platform",
      description: "ERP management with AI-driven insights and seamless connectivity between departments, students, admin, and parents.",
      image: `${imageBase}/erp.jpg`,
      category: "Full‑Stack",
      technologies: ["Python", "Django", "JavaScript", "HTML"],
      type: "Web Platform"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Work Experience */}
        <div className="mb-16 animate-fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-10">
            A snapshot of roles where I built elegant visuals and performant interfaces.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-serif text-xl">
                      {exp.role}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-nature-sage text-nature-primary font-medium">
                      {exp.period}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2 text-sm text-muted-foreground">
                    {exp.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-nature-primary/20 text-nature-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my creative journey through AI & ML Integrated IOT and Microcontrollers , 3D visualization, and web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className={`group cursor-pointer overflow-hidden border-0 shadow-elegant hover:shadow-warm transition-all duration-500 transform hover:-translate-y-2 animate-scale-in bg-card/80 backdrop-blur-sm ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-contain bg-black/5 dark:bg-white/5 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = heroImg;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-nature opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-nature-sage text-nature-primary font-medium">
                    {project.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">
                    {project.type}
                  </span>
                </div>
                <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs border-nature-primary/20 text-nature-primary hover:bg-nature-primary/10 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;