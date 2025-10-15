import { Card } from '@/components/ui/card';
import { Briefcase, Users, Trophy } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      icon: Briefcase,
      color: 'primary',
      title: 'Full Stack Developer Intern',
      organization: 'IEEE Tunisia Section × Orange Digital Center',
      period: '2023 - 2024',
      description:
        'Developed Event ToolBox, a comprehensive event management platform using React, NestJS, and PostgreSQL. Collaborated with cross-functional teams to deliver scalable solutions.',
      achievements: [
        'Built complete full-stack application from scratch',
        'Implemented RESTful APIs and database architecture',
        'Improved event management efficiency by 40%',
      ],
    },
    {
      icon: Users,
      color: 'secondary',
      title: 'Treasurer',
      organization: 'IEEE IIP Student Branch',
      period: '2023 - Present',
      description:
        'Managing financial operations and supporting technical initiatives for the student branch. Organizing workshops, hackathons, and technical events.',
      achievements: [
        'Managed annual budget and financial reporting',
        'Organized 10+ technical workshops and events',
        'Increased member engagement by 60%',
      ],
    },
    {
      icon: Trophy,
      color: 'primary',
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
