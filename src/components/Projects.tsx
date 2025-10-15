import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'DefenSys',
      description:
        'A cutting-edge application security platform that integrates static application security testing (SAST) with AI-powered vulnerability detection. Provides actionable security insights directly in the development lifecycle.',
      tags: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'AI', 'Cybersecurity'],
      github: 'https://github.com',
      demo: '',
    },
    {
      title: 'CTF for Wireless & IoT Security Platform',
      description:
        'A gamified cybersecurity training platform simulating Wi-Fi and IoT vulnerabilities. Includes Docker-based challenges for WPA2 cracking, BLE sniffing, and firmware analysis with automatic scoring.',
      tags: ['Docker', 'Cybersecurity', 'IoT', 'Python', 'Linux'],
      github: 'https://github.com',
      demo: '',
    },
    {
      title: 'Hugging Face for Cybersecurity',
      description:
        'A sandboxed web platform allowing users to upload, explore, and execute cybersecurity tools, datasets, and labs safely using Docker/KVM virtualization.',
      tags: ['Docker', 'KVM', 'Python', 'Security', 'Sandboxing'],
      github: 'https://github.com',
      demo: '',
    },
    {
      title: 'Expense Tracker App',
      description:
        'A smart financial management app with secure login, dashboard analytics, budgeting, and notifications for tracking expenses and managing budgets.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'JWT'],
      github: 'https://github.com',
      demo: '',
    },
    {
      title: 'To-Do List Web App',
      description:
        'Lightweight Flask-based task manager with PostgreSQL backend. Features task prioritization, categories, and deadline tracking.',
      tags: ['Flask', 'Python', 'PostgreSQL', 'HTML/CSS', 'JavaScript'],
      github: 'https://github.com',
      demo: '',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-slide-up">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card border-border hover:border-primary transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    variant="secondary"
                    size="sm"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
