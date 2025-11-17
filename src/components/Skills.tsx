import { Card } from '@/components/ui/card';
import { Code2, Globe, Database, Container, Brain, Shield } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: Code2,
      color: 'primary',
      skills: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
    },
    {
      title: 'Web Development',
      icon: Globe,
      color: 'secondary',
      skills: ['React', 'Next.js', 'Node.js', 'NestJS', 'TailwindCSS', 'Flask', 'Django'],
    },
    {
      title: 'Database',
      icon: Database,
      color: 'primary',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
      title: 'DevOps & Tools',
      icon: Container,
      color: 'secondary',
      skills: ['Docker', 'Git', 'VS Code', 'Zabbix', 'UTM'],
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'primary',
      skills: ['TensorFlow Lite', 'ML Models', 'Data Analysis'],
    },
    {
      title: 'Cybersecurity',
      icon: Shield,
      color: 'secondary',
      skills: ['Pentesting', 'Wi-Fi Security', 'IoT Security', 'CTF Challenges'],
    },
  ];

  return (
    <section id="skills" className="relative z-10 py-20 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-slide-up">
          Technical <span className="text-primary">Skills</span>
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const colorClass = category.color === 'primary' ? 'text-primary' : 'text-secondary';
            const bgClass = category.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10';
            const borderClass = category.color === 'primary' ? 'border-primary' : 'border-secondary';

            return (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-border hover:border-opacity-100 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${bgClass} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${colorClass}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1 text-sm rounded-full border ${borderClass} bg-background/50`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
