import { Card } from '@/components/ui/card';
import { Briefcase, Users, Trophy } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      icon: Briefcase,
      color: 'primary',
      title: 'DevOps Developer Intern',
      organization: 'VEO Tunisie',
      period: 'Aug 2025 - Sep 2025',
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
      color: 'secondary',
      title: 'Embedded Systems Intern',
      organization: 'BQube ITs',
      period: 'Jul 2025 - Aug 2025',
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
      color: 'primary',
      title: 'Treasurer',
      organization: 'IEEE IIP Student Branch',
      period: '2023 - Present',
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
      color: 'secondary',
      title: 'Hackathon & CTF Participant',
      organization: 'Various Events',
      period: '2022 - Present',
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
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-slide-up">
          Experience & <span className="text-primary">Involvement</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const colorClass = exp.color === 'primary' ? 'text-primary' : 'text-secondary';
            const bgClass = exp.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10';

            return (
              <Card
                key={index}
                className="p-6 md:p-8 bg-gradient-card border-border hover:border-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={`p-4 ${bgClass} rounded-lg self-start`}>
                    <Icon className={`w-8 h-8 ${colorClass}`} />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                      <p className={`text-lg ${colorClass} font-semibold mb-1`}>
                        {exp.organization}
                      </p>
                      <p className="text-sm text-muted-foreground font-mono">{exp.period}</p>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        Key Achievements:
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2">
                            <span className={`${colorClass} mt-1`}>▸</span>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
