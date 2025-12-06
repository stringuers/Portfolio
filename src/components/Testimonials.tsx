import { Card } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'IASTAM 5.0 Tech Challenge',
      role: '1st Place Winner',
      content: 'Abdelmoemen demonstrated exceptional skills in AI-powered security solutions, creating innovative vulnerability detection systems that impressed the judges.',
      rating: 5,
      event: 'Tech Competition',
    },
    {
      name: 'Nuit de l\'informatique 2025',
      role: '2nd Place Winner',
      content: 'Developed an innovative solution for AI learning and experimentation at ISITCOM, showcasing expertise in machine learning applications and educational technology platforms.',
      rating: 5,
      event: 'ISITCOM Competition',
    },
    {
      name: 'Raksha Hackathon',
      role: 'Cybersecurity Expert',
      content: 'Outstanding performance in developing secure IoT solutions and implementing advanced security protocols for embedded systems.',
      rating: 5,
      event: 'Hackathon',
    },
    {
      name: 'Extreeme CTF',
      role: 'Top Performer',
      content: 'Consistently ranked among top participants, showcasing deep understanding of penetration testing and vulnerability assessment.',
      rating: 5,
      event: 'CTF Competition',
    },
  ];

  return (
    <section id="testimonials" className="relative z-10 py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Recognition & <span className="text-accent">Achievements</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Highlights from competitions, hackathons, and professional recognition
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-card/60 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-accent/50" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6 flex-grow">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-border/50">
                <p className="font-semibold text-foreground mb-1">{testimonial.name}</p>
                <p className="text-sm text-accent mb-1">{testimonial.role}</p>
                <p className="text-xs text-foreground/60">{testimonial.event}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

