import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Anchor, Compass, Waves, Star } from "lucide-react";

const GamifiedStats = () => {
  const level = 7;
  const xp = 4200;
  const nextLevelXp = 5000;
  const progress = Math.min(100, Math.round((xp / nextLevelXp) * 100));

  const badges = [
    { icon: Anchor, label: "Anchor of Focus" },
    { icon: Compass, label: "Compass of Curiosity" },
    { icon: Waves, label: "Wave Rider" },
    { icon: Star, label: "Constellation Coder" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200/40 dark:from-sky-900/20 dark:via-sky-900/30 dark:to-sky-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Voyager Progress</h2>
          <p className="text-muted-foreground mt-3">A sea‑themed view of growth: levels, XP, and badges.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-elegant bg-gradient-to-br from-sky-100/70 to-cyan-100/70 dark:from-sky-900/30 dark:to-cyan-900/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <span className="font-serif">Captain Level</span>
                <span className="text-3xl font-bold text-nature-primary">{level}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-muted-foreground">XP {xp.toLocaleString()} / {nextLevelXp.toLocaleString()}</div>
              <Progress value={progress} className="h-3 bg-sky-200" />
              <div className="mt-2 text-xs text-muted-foreground">{progress}% to next voyage</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant bg-gradient-to-br from-cyan-100/70 to-sky-100/70 dark:from-cyan-900/30 dark:to-sky-900/30 backdrop-blur lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif">Sea Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {badges.map(({ icon: Icon, label }) => (
                  <Badge key={label} variant="secondary" className="bg-sky-200/60 dark:bg-sky-800/50 text-sky-900 dark:text-sky-100 flex items-center gap-2 py-1.5 px-2.5">
                    <Icon className="w-4 h-4" />
                    {label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GamifiedStats;


