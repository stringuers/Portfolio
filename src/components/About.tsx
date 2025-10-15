import { Card } from '@/components/ui/card';
import { User, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-slide-up">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-slide-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-foreground font-semibold">21-year-old Computer Engineering and IoT student</span> with 
              a deep passion for <span className="text-primary font-semibold">cybersecurity</span>, <span className="text-secondary font-semibold">artificial intelligence</span>, 
              and <span className="text-primary font-semibold">embedded systems</span>.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I love building <span className="text-foreground font-semibold">innovative projects</span>, participating 
              in <span className="text-secondary font-semibold">hackathons and CTF challenges</span>, and sharing knowledge 
              through volunteering. Currently serving as the <span className="text-foreground font-semibold">Treasurer of IEEE IIP Student Branch</span>, 
              I actively contribute to technical events and community building.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in tech is driven by curiosity and the desire to create solutions that make a difference. 
              Whether it's securing IoT devices, developing full-stack applications, or exploring AI/ML models, 
              I'm always eager to learn and grow.
            </p>
          </div>

          <div className="grid gap-4 animate-fade-in">
            <Card className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Student & Developer</h3>
                  <p className="text-muted-foreground">
                    Computer Engineering & IoT at 21, constantly learning and building
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border hover:border-secondary transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">IEEE Treasurer</h3>
                  <p className="text-muted-foreground">
                    Leading financial operations and supporting technical initiatives
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Contributor</h3>
                  <p className="text-muted-foreground">
                    Active in hackathons, CTFs, and knowledge-sharing events
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
