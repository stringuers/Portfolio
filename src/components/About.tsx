import { Card } from '@/components/ui/card';
import { User, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-slide-up">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 animate-slide-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-foreground font-semibold">Computer Engineering & IoT student</span> focused on
              designing secure, production-ready systems. My work sits at the intersection of <span className="text-secondary font-semibold">cybersecurity</span>,
              <span className="mx-1"> </span><span className="text-secondary font-semibold">AI/ML</span>, and <span className="text-secondary font-semibold">full-stack engineering</span>.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I build reliable applications and harden systems for real-world constraints — from embedded IoT
              firmware to distributed backend services. I also mentor and organize technical events as
              Treasurer of the IEEE IIP Student Branch.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Outside of projects, I enjoy CTFs and community workshops where I both learn and share practical
              security techniques.
            </p>
          </div>

          <div className="grid gap-4 animate-fade-in">
            <Card className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Developer & Researcher</h3>
                  <p className="text-muted-foreground">
                    Building secure full-stack systems and experiments across cloud and edge.
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
                    Supporting technical programs, events, and student initiatives.
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
                    Mentoring, running workshops, and competing in CTFs to sharpen practical skills.
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
