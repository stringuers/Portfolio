import { Card } from '@/components/ui/card';
import { Briefcase, Users, Trophy, Calendar } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      icon: Briefcase,
      title: 'DevOps Developer Intern',
      organization: 'VEO Tunisie',
      period: 'Aug 2025 - Sep 2025',
      location: 'Tunis, Tunisia',
      description:
        'Worked on DevOps pipelines using GitLab CI/CD and ABAP. Developed automation scripts for deployment and monitoring to improve system reliability and workflow integration.',
      achievements: [
        'Built CI/CD pipelines using GitLab',
        'Developed automation scripts for deployment',
        'Improved system reliability and monitoring',
      ],
    },
    {
      icon: Briefcase,
      title: 'Embedded Systems Intern',
      organization: 'BQube ITs',
      period: 'Jul 2025 - Aug 2025',
      location: 'Tunis, Tunisia',
      description:
        'Worked on embedded C++ development and IoT-based systems. Implemented low-level firmware and communication protocols for real-time embedded solutions.',
      achievements: [
        'Developed embedded C++ firmware',
        'Implemented IoT communication protocols',
        'Contributed to real-time embedded systems',
      ],
    },
    {
      icon: Users,
      title: 'Treasurer',
      organization: 'IEEE IIP Student Branch',
      period: '2023 - Present',
      location: 'Tunis, Tunisia',
      description:
        'Managing finances and organizing technical workshops. Supporting student-led innovation in AI, IoT, and security.',
      achievements: [
        'Managed annual budget and financial reporting',
        'Organized 10+ technical workshops and events',
        'Supporting innovation in AI, IoT, and security',
      ],
    },
    {
      icon: Trophy,
      title: 'Hackathon & CTF Participant',
      organization: 'Various Events',
      period: '2022 - Present',
      location: 'Tunisia & Global',
      description:
        'Active participation in hackathons and Capture The Flag competitions focused on IoT, AI, and cybersecurity challenges.',
      achievements: [
        'Participated in 15+ competitive events',
        'Won awards in IoT and security challenges',
        'Collaborated with diverse teams on innovative solutions',
      ],
    },
  ];

  return (
    <section id="experience" className="relative z-10 py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Experience & <span className="text-accent">Involvement</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            My professional journey and community contributions
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent hidden md:block transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="p-2 bg-accent/10 rounded-full border-2 border-accent/30 hover:border-accent/50 transition-all duration-300">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <Card
                        className="p-6 md:p-8 bg-card/60 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                      >
                        {/* Mobile icon */}
                        <div className="md:hidden flex items-center gap-4 mb-4">
                          <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                            <Icon className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-mono text-accent font-semibold">{exp.period}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                                {exp.title}
                              </h3>
                              <div className="hidden md:block">
                                <p className="text-sm font-mono text-accent font-semibold">{exp.period}</p>
                              </div>
                            </div>
                            <p className="text-lg text-accent font-semibold mb-1">
                              {exp.organization}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>

                          <p className="text-foreground/70 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="space-y-2 pt-4 border-t border-border/50">
                            <p className="font-semibold text-sm uppercase tracking-wider text-foreground/60">
                              Key Achievements:
                            </p>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-2">
                                  <span className="text-accent mt-1.5 font-bold">▸</span>
                                  <span className="text-foreground/70">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
