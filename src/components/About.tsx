import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Code, Lightbulb, Users } from "lucide-react";
import profilePic from "@/assets/profile pic.jpg";
import ScrollEffects from "./ScrollEffects";
import TypewriterText from "./TypewriterText";
import ParallaxElement from "./ParallaxElement";

const About = () => {
  const skills = [
    { category: "STACKS KNOWN!", items: ["python", "react-js", "HTML", "CSS", "JS", "JAVA", "DJANGO","C++","FLASK", "SQL","MONGO DB"] },
    { category: "UI AND UX", items: ["FIGMA", "CANVA"] },
    { category: "AI AND ML", items: ["TensorFlow", "Pytorch", "Scikit-learn", "Pandas", "UNTRALYTICS"] },
    { category: "IOT TOOLS", items: ["ESP8266", "RASBERRYPI", "JETSON NANO"] }
  ];

  const values = [
    {
      icon: Palette,
      title: "Creative Excellence",
      description: "Pushing the boundaries of visual design with innovative solutions and artistic vision."
    },
    {
      icon: Code,
      title: "Technical Mastery",
      description: "Bridging the gap between design and technology with cutting-edge development skills."
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Constantly exploring new tools and techniques to deliver exceptional results."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "Working closely with clients and teams to bring visions to life through effective communication."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Section - Shows first on mobile, second on desktop */}
          <div className="order-1 lg:order-2 animate-fade-in-up space-y-8 w-full">
            <div className="relative">
              <img
                src={profilePic}
                alt="My profile photo"
                className="w-full max-w-sm sm:max-w-md mx-auto rounded-2xl shadow-warm"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-nature opacity-10"></div>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-foreground text-center">Core Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((value) => (
                  <Card key={value.title} className="border-0 shadow-elegant bg-card/50 backdrop-blur-sm hover:shadow-warm transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <value.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-foreground mb-2 text-sm">{value.title}</h4>
                      <p className="text-xs text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Text Content - Shows second on mobile, first on desktop */}
          <div className="order-2 lg:order-1 w-full">
            <ScrollEffects effect="fadeIn" delay={200} duration={800}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center lg:text-left">
                <TypewriterText 
                  text="About Me"
                  speed={100}
                  delay={300}
                  className="text-foreground"
                />
              </h2>
            </ScrollEffects>
            <ScrollEffects effect="slideUp" delay={400} duration={1000}>
              <div className="space-y-4 sm:space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-base sm:text-lg">
                I am Delight Cherubino, and I'm all about turning data into game-changing moves! I live where AI, Cloud, and Analytics collide, transforming boring numbers into ideas that spark real impact. My foundation in AI & Data Science from Ramco Institute of Technology isn't just a degree—it's my launchpad for crafting solutions that make a difference.
                </p>
                <div className="space-y-2">
                  <p className="text-base sm:text-lg font-medium">Here's what I'm bringing to the party:</p>
                  <ul className="space-y-1 text-sm sm:text-base">
                    <li>• AI that doesn't just predict stuff, but shakes things up</li>
                    <li>• Analytics that turn complex chaos into clear wins</li>
                    <li>• Strategies that connect tech smarts with big business vibes</li>
                  </ul>
                </div>
                <p className="text-base sm:text-lg">
                I'm always pumped to team up with dreamers and doers, break the mold, and push data to do wild things in the tech world. Let's create something awesome together!
                </p>
              </div>
            </ScrollEffects>

            {/* Skills Grid */}
            <ScrollEffects effect="scale" delay={600} duration={800}>
              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {skills.map((skillGroup, index) => (
                  <ScrollEffects key={skillGroup.category} effect="slideUp" delay={700 + index * 100} duration={600}>
                    <Card className="border-0 shadow-elegant bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-3 sm:p-4">
                        <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">{skillGroup.category}</h4>
                        <div className="flex flex-wrap gap-1">
                          {skillGroup.items.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs bg-nature-sage text-nature-primary"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollEffects>
                ))}
              </div>
            </ScrollEffects>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;