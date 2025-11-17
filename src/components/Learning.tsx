import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const Learning = () => {
  const learningPath = [
    {
      title: 'JavaScript Fundamentals',
      status: 'completed',
      description: 'Mastered ES6+, async/await, and advanced JavaScript patterns',
    },
    {
      title: 'React & Modern Frontend',
      status: 'completed',
      description: 'Built scalable applications with React hooks and state management',
    },
    {
      title: 'Next.js & Full-Stack Development',
      status: 'in-progress',
      description: 'Server-side rendering, API routes, and building production-ready apps',
    },
    {
      title: 'DevOps & CI/CD Mastery',
      status: 'in-progress',
      description: 'GitLab CI/CD, Docker, automation, and deployment pipelines',
    },
    {
      title: 'Ethical Hacking & Pentesting',
      status: 'in-progress',
      description: 'Advanced penetration testing, CTF challenges, and vulnerability research',
    },
    {
      title: 'AI + Cybersecurity Integration',
      status: 'in-progress',
      description: 'Combining AI with security: ML-based threat detection and SAST tools',
    },
    {
      title: 'Building Scalable IoT & Web Systems',
      status: 'planned',
      description: 'Architecting and deploying large-scale embedded and cloud solutions',
    },
  ];

  return (
    <section id="learning" className="relative z-10 py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-slide-up">
          Learning <span className="text-primary">Journey</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Continuous growth and exploration in technology
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted hidden md:block" />

            <div className="space-y-6">
              {learningPath.map((item, index) => {
                const isCompleted = item.status === 'completed';
                const isInProgress = item.status === 'in-progress';

                return (
                  <Card
                    key={index}
                    className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300 ml-0 md:ml-16 relative animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute -left-16 top-8">
                      {isCompleted ? (
                        <div className="bg-primary rounded-full p-1">
                          <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                        </div>
                      ) : isInProgress ? (
                        <div className="bg-secondary rounded-full p-1">
                          <ArrowRight className="w-4 h-4 text-secondary-foreground animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-muted" />
                      )}
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="md:hidden">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        ) : isInProgress ? (
                          <ArrowRight className="w-6 h-6 text-secondary animate-pulse" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              isCompleted
                                ? 'bg-primary/10 text-primary'
                                : isInProgress
                                ? 'bg-secondary/10 text-secondary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.status === 'completed'
                              ? 'Completed'
                              : item.status === 'in-progress'
                              ? 'In Progress'
                              : 'Planned'}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learning;
