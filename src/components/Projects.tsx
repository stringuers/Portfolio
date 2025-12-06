import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const projects = [
    {
      title: 'DefenSys',
      description:
        'A cutting-edge application security platform that integrates static application security testing (SAST) with AI-powered vulnerability detection.',
      tags: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'AI', 'Cybersecurity'],
      github: 'https://github.com/stringuers/DefenSys',
      demo: '',
      featured: true,
      backDetails: {
        tech: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'AI/ML', 'Docker'],
        features: ['Real-time vulnerability scanning', 'AI-powered threat detection', 'CI/CD integration', 'Comprehensive security reports'],
        highlights: 'Won 1st place at IASTAM 5.0 Tech Challenge for innovative AI-powered security solutions.',
      },
    },
    {
      title: 'Solar Swarm Intelligence',
      description:
        'A multi-agent reinforcement learning platform for optimizing community-scale solar energy usage, forecasting, and peer-to-peer energy sharing.',
      tags: ['FastAPI', 'Python', 'Docker', 'React+vite', 'TailwindCSS', 'IoT'],
      github: 'https://github.com/stringuers/solar-swarm-intelligence',
      demo: '',
      featured: true,
      backDetails: {
        tech: ['FastAPI', 'Python', 'Docker', 'React', 'Reinforcement Learning', 'IoT'],
        features: ['Multi-agent optimization', 'Energy forecasting', 'P2P trading', 'Real-time analytics'],
        highlights: 'Advanced ML algorithms for sustainable energy management.',
      },
    },
    {
      title: 'CTF Platform',
      description:
        'A gamified cybersecurity platform for hosting CTFs with Docker-based challenges and automatic scoring.',
      tags: ['Docker', 'Cybersecurity', 'IoT', 'Python', 'Linux'],
      github: 'https://github.com/stringuers/CTF-Platform',
      demo: '',
      featured: false,
      backDetails: {
        tech: ['Docker', 'Python', 'Linux', 'Cybersecurity', 'Web Technologies'],
        features: ['Automated challenge deployment', 'Real-time scoring', 'Multiple challenge types', 'User management'],
        highlights: 'Scalable platform for cybersecurity training and competitions.',
      },
    },
    {
      title: 'Wireless & IoT Security CTF',
      description:
        'A gamified cybersecurity training platform simulating Wi-Fi and IoT vulnerabilities with Docker-based challenges.',
      tags: ['Docker', 'Cybersecurity', 'IoT', 'Python', 'Linux'],
      github: 'https://github.com/stringuers/Wireless_ctf',
      demo: '',
      featured: false,
      backDetails: {
        tech: ['Docker', 'Python', 'Wi-Fi Security', 'IoT Protocols', 'BLE'],
        features: ['WPA2 cracking challenges', 'BLE sniffing', 'Firmware analysis', 'Automated scoring'],
        highlights: 'Specialized platform for wireless and IoT security education.',
      },
    },
    {
      title: 'Hugging Face for Cybersecurity',
      description:
        'A sandboxed web platform allowing users to upload, explore, and execute cybersecurity tools safely using Docker/KVM virtualization.',
      tags: ['Docker', 'KVM', 'Python', 'Security', 'Sandboxing'],
      github: 'https://github.com',
      demo: '',
      featured: false,
      backDetails: {
        tech: ['Docker', 'KVM', 'Python', 'Web Technologies', 'Virtualization'],
        features: ['Secure sandboxing', 'Tool execution', 'Dataset management', 'Lab environment'],
        highlights: 'Safe execution environment for cybersecurity research and learning.',
      },
    },
    {
      title: 'Expense Tracker App',
      description:
        'A smart financial management app with secure login, dashboard analytics, budgeting, and notifications.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'JWT'],
      github: 'https://github.com/stringuers/ExpenseTracker',
      demo: '',
      featured: false,
      backDetails: {
        tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'TailwindCSS'],
        features: ['Secure authentication', 'Budget tracking', 'Analytics dashboard', 'Notifications'],
        highlights: 'Full-stack financial management solution with real-time insights.',
      },
    },
    {
      title: 'To-Do List Web App',
      description:
        'Lightweight Flask-based task manager with PostgreSQL backend. Features task prioritization, categories, and deadline tracking.',
      tags: ['Flask', 'Python', 'PostgreSQL', 'HTML/CSS', 'JavaScript'],
      github: 'https://github.com/stringuers/todo',
      demo: '',
      featured: false,
      backDetails: {
        tech: ['Flask', 'Python', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
        features: ['Task prioritization', 'Category management', 'Deadline tracking', 'User-friendly UI'],
        highlights: 'Simple yet powerful task management solution.',
      },
    },
  ];

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section id="projects" className="relative z-10 py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            A collection of projects showcasing my skills in full-stack development, AI/ML, and cybersecurity
          </p>
        </div>

        {/* Projects Grid - Fixed Layout */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const isFlipped = flippedCards.has(index);

            return (
              <div
                key={index}
                className="flip-card-container flying-card h-[500px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  {/* Front of Card */}
                  <div className="flip-card-front">
                    <Card className="h-full p-6 bg-card/80 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col">
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20 w-fit">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      )}

                      <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-foreground/70 mb-4 leading-relaxed line-clamp-3 text-sm flex-grow">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2.5 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mb-3">
                        {project.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1 border-border hover:border-accent text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              <Github className="w-3.5 h-3.5 mr-1.5" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demo && (
                          <Button
                            variant="hero"
                            size="sm"
                            asChild
                            className="flex-1 text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>

                      {/* Flip hint */}
                      <div className="text-center pt-3 border-t border-border/50 mt-auto">
                        <p className="text-xs text-foreground/50 flex items-center justify-center gap-1.5">
                          <RotateCcw className="w-3 h-3" />
                          Click for details
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Back of Card */}
                  <div className="flip-card-back">
                    <Card className="h-full p-6 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 backdrop-blur-sm border-2 border-accent/20 shadow-xl flex flex-col overflow-y-auto">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-5 flex-shrink-0">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-accent mb-1">{project.title}</h3>
                          <p className="text-xs text-foreground/60">Additional Details</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(index);
                          }}
                          className="h-7 w-7 hover:bg-accent/10 flex-shrink-0"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-accent" />
                        </Button>
                      </div>

                      {/* Highlights */}
                      {project.backDetails.highlights && (
                        <div className="mb-5 p-3 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                          <p className="text-xs font-semibold text-accent mb-1.5">Highlights</p>
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            {project.backDetails.highlights}
                          </p>
                        </div>
                      )}

                      {/* Features */}
                      <div className="mb-5 flex-shrink-0">
                        <p className="text-xs font-semibold text-foreground mb-2.5">Key Features</p>
                        <ul className="space-y-1.5">
                          {project.backDetails.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-foreground/70">
                              <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-5 flex-shrink-0">
                        <p className="text-xs font-semibold text-foreground mb-2.5">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.backDetails.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2.5 py-1 text-xs rounded-full bg-accent/15 text-accent border border-accent/25"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      {project.github && (
                        <Button
                          variant="hero"
                          size="sm"
                          asChild
                          className="w-full mt-auto flex-shrink-0 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            <Github className="w-3.5 h-3.5 mr-1.5" />
                            View on GitHub
                          </a>
                        </Button>
                      )}
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
