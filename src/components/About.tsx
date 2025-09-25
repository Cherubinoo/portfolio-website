import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Code, Lightbulb, Users } from "lucide-react";
import profilePic from "@/assets/profile pic.jpg";

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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - About Text */}
          <div className="animate-fade-in-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Me
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
              I am Delight Cherubino, and I’m all about turning data into game-changing moves! I live where AI, Cloud, and Analytics collide, transforming boring numbers into ideas that spark real impact. My foundation in AI & Data Science from Ramco Institute of Technology isn’t just a degree—it’s my launchpad for crafting solutions that make a difference.
              </p>
              <p>
              Here’s what I’m bringing to the party:
                <p>AI that doesn’t just predict stuff, but shakes things up</p>
                <p>Analytics that turn complex chaos into clear wins</p>
                <p>Strategies that connect tech smarts with big business vibes</p>
              </p>
              <p>
              I’m always pumped to team up with dreamers and doers, break the mold, and push data to do wild things in the tech world. Let’s create something awesome together!
              </p>
            </div>

            {/* Skills Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <Card key={skillGroup.category} className="border-0 shadow-elegant bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-3">{skillGroup.category}</h4>
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
              ))}
            </div>
          </div>

          {/* Right Column - Values & Image */}
          <div className="animate-fade-in-up space-y-8">
            <div className="relative">
              <img
                src={profilePic}
                alt="My profile photo"
                className="w-full max-w-md mx-auto rounded-2xl shadow-warm"
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
        </div>
      </div>
    </section>
  );
};

export default About;