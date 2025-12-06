import { Card } from '@/components/ui/card';
import { User, Award, Heart, Code2, Shield, Rocket } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Projects', value: '15+', icon: Code2, color: 'accent' },
    { label: 'CTF Events', value: '20+', icon: Shield, color: 'accent' },
    { label: 'Awards', value: '5+', icon: Award, color: 'accent' },
    { label: 'Technologies', value: '30+', icon: Rocket, color: 'accent' },
  ];

  return (
    <section id="about" className="relative z-10 py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-accent">Me</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Building secure systems at the intersection of cybersecurity, AI, and full-stack engineering
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <Card
                key={index}
                className="p-6 bg-card/60 backdrop-blur-sm border border-border hover:border-accent/50 hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Text */}
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed">
                I'm a <span className="text-foreground font-semibold">Computer Engineering & IoT student</span> focused on
                designing secure, production-ready systems. My work sits at the intersection of{' '}
                <span className="text-accent font-semibold">cybersecurity</span>,{' '}
                <span className="text-accent font-semibold">AI/ML</span>, and{' '}
                <span className="text-accent font-semibold">full-stack engineering</span>.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                I build reliable applications and harden systems for real-world constraints — from embedded IoT
                firmware to distributed backend services. I also mentor and organize technical events as
                <span className="text-accent font-semibold"> Treasurer of the IEEE IIP Student Branch</span>.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed">
                Outside of projects, I enjoy <span className="text-accent font-semibold">CTFs</span> and community workshops where I both learn and share practical
                security techniques!
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6">
            {[
              {
                icon: User,
                title: 'Developer & Researcher',
                description: 'Building secure full-stack systems and experiments across cloud and edge computing environments.',
              },
              {
                icon: Award,
                title: 'IEEE Treasurer',
                description: 'Supporting technical programs, events, and student initiatives while managing organizational finances.',
              },
              {
                icon: Heart,
                title: 'Community Contributor',
                description: 'Mentoring, running workshops, and competing in CTFs to sharpen practical security skills.',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={index}
                  className="p-6 bg-card/60 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 group card-lift"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
