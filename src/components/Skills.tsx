import { Card } from '@/components/ui/card';
import { Code2, Globe, Database, Container, Brain, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const skillCategories = [
    {
      title: 'Programming',
      icon: Code2,
      skills: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
      level: 90,
    },
    {
      title: 'Web Development',
      icon: Globe,
      skills: ['React', 'Next.js', 'Node.js', 'NestJS', 'TailwindCSS', 'Flask', 'Django'],
      level: 88,
    },
    {
      title: 'Database',
      icon: Database,
      skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
      level: 85,
    },
    {
      title: 'DevOps & Tools',
      icon: Container,
      skills: ['Docker', 'Git', 'VS Code', 'Zabbix', 'UTM'],
      level: 82,
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      skills: ['TensorFlow Lite', 'ML Models', 'Data Analysis'],
      level: 78,
    },
    {
      title: 'Cybersecurity',
      icon: Shield,
      skills: ['Pentesting', 'Wi-Fi Security', 'IoT Security', 'CTF Challenges'],
      level: 85,
    },
  ];

  return (
    <section id="skills" className="relative z-10 py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Technical <span className="text-accent">Skills</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            A comprehensive overview of my technical expertise across multiple domains
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Card
                key={index}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-6 bg-card/60 backdrop-blur-sm border border-border transition-all duration-300 group card-lift ${
                  hoveredCategory === index ? 'border-accent/50 shadow-lg' : 'hover:border-accent/30'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-accent/10 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold flex-1">{category.title}</h3>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground/60">Proficiency</span>
                    <span className="text-sm font-bold text-accent">{category.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${category.level}%` }}
                    />
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Skills Summary */}
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="p-8 bg-card/60 backdrop-blur-sm border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Additional Expertise</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-foreground/60 mb-2 uppercase tracking-wider">
                  Methodologies
                </p>
                <p className="text-foreground/80">Agile, Scrum, CI/CD, Test-Driven Development</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground/60 mb-2 uppercase tracking-wider">
                  Specializations
                </p>
                <p className="text-foreground/80">IoT Security, AI/ML Integration, Cloud Architecture</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
