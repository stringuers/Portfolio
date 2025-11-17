import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DynamicBackground from '@/components/ui/DynamicBackground';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: 'hackathon' | 'conference' | 'social';
  description: string;
  achievement?: string;
  images: string[];
}

const EventsSection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const events: Event[] = [
    {
      id: 101,
      title: 'IEEEXtreme 19.0',
      date: ' 2025',
      location: 'Global (Online)',
      type: 'hackathon',
      description: '24 hours of non-stop competitive programming at IEEEXtreme! Solving algorithms, debugging at 3 AM, and pushing our limits. Two years of intense coding challenges!',
      achievement: 'Participant and completed all challenges',
      images: [
        'src/pages/images/extreeme.jpg',
        
      ],
    },

    {
      id: 1,
      title: 'IASTAM 5.0',
      date: 'October 2025',
      location: 'Hammamet, Tunisia',
      type: 'conference',
      description: 'I won first place in the Tech Challenge at IASTAM 5 (2025), leading event for industrial technology. My project DefenSys was recognized for innovative AI-powered application security.',
      achievement: 'First Place in Tech Challenge',
      images: [
        'src/pages/images/iastam1.jpeg',
        'src/pages/images/iastam2.jpeg',
        'src/pages/images/iastam3.jpeg',
      ],
    },
    {
      id: 8,
      title: 'IAC:IEEE IAS 60TH Anniversary',
      date: 'avril 2025',
      location: 'Tunis, Tunisia',
      type: 'conference',
      description: 'IAC:IEEE IAS 60TH Anniversary, a powerful conversation exploring industrial journey, innovations driving change, and the road ahead.',
      achievement: 'Celebration of innovation, teamwork and collaboration',
      images: [
        'src/pages/images/iac1.jpeg',
        'src/pages/images/iac2.jpg',
      ],
    },
    {
      id: 2,
      title: 'Raksha Pentest',
      date: 'Avril 2025',
      location: 'EPI Sousse, Tunisia',
      type: 'hackathon',
      description: 'Raksha Pentest is an intense 26-hour cybersecurity hackathon focused on penetration testing and ethical hacking. Participants tackle real-world security challenges and defend systems.',
      achievement: '4th Place in Pentest',
      images: [
        'src/pages/images/raksha1.jpeg',
        'src/pages/images/raksha2.jpeg',
        'src/pages/images/raksha3.jpeg',
      ],
    },
    {
      id: 3,
      title: 'RedRoom hackathon',
      date: 'Fevrier 2025',
      location: 'ISITCOM, Sousse, Tunisia',
      type: 'hackathon',
      description: 'Secured 3rd place in RedRoom Hackathon, a challenging cybersecurity competition focused on CTFs and penetration testing, demonstrating practical offensive and defensive skills.',
      achievement: '3rd Place in CTF, ARG, Pentest',
      images: [
        'src/pages/images/redroom1.jpeg',
        'src/pages/images/redroom2.jpeg',
        'src/pages/images/redroom3.jpeg', 
      ],
    },
    {
      id: 4,
      title: 'CyberBenders hackathon',
      date: 'December 2024',
      location: 'EPI Sousse, Tunisia',
      type: 'hackathon',
      description: 'Secured 4th place with team in Cyberbenders hackathon, a challenging cybersecurity competition focused on CTFs and AI challenges.',
      achievement: '4th Place in CTF, AI',
      images: [
      ],
    },
    
    
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'bg-primary text-primary-foreground';
      case 'conference':
        return 'bg-secondary text-secondary-foreground';
      case 'social':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hackathon':
        return <Trophy className="w-4 h-4" />;
      case 'conference':
        return <Users className="w-4 h-4" />;
      case 'social':
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <DynamicBackground />
      <Navigation />
      <main className="relative z-10">
        <section id="events" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-primary">
                Events & Experiences
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hackathons, conferences, and networking events that shaped my journey
              </p>
            </div>

            {/* Events Grid */}
            <div className="space-y-8">
              {events.map((event, index) => (
                <Card
                  key={event.id}
                  className="group overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Event Details */}
                      <div className="p-6 md:p-8 flex flex-col justify-center space-y-4 bg-card">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={`${getTypeColor(event.type)} flex items-center gap-1`}>
                            {getTypeIcon(event.type)}
                            <span className="capitalize">{event.type}</span>
                          </Badge>
                          {event.achievement && (
                            <Badge variant="outline" className="border-secondary text-secondary">
                              {event.achievement}
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <p className="text-foreground/80 leading-relaxed">{event.description}</p>
                      </div>

                      {/* Image Gallery */}
                      <div className="relative">
                        <div
                          className={`grid gap-2 p-4 ${
                            event.images.length === 1
                              ? 'grid-cols-1'
                              : event.images.length === 2
                              ? 'grid-cols-2'
                              : event.images.length === 3
                              ? 'grid-cols-2 grid-rows-2'
                              : 'grid-cols-2 grid-rows-2'
                          }`}
                        >
                          {event.images.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`relative overflow-hidden rounded-lg cursor-pointer group/img ${
                                event.images.length === 3 && imgIndex === 0 ? 'row-span-2' : ''
                              } ${event.images.length >= 4 && imgIndex === 0 ? 'col-span-2' : ''}`}
                              onClick={() => setSelectedImage(image)}
                            >
                              <img
                                src={image}
                                alt={`${event.title} - Image ${imgIndex + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                                style={{ minHeight: event.images.length === 1 ? '100%' : '150px' }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 bg-background/80 hover:bg-background text-foreground rounded-full p-3 transition-all duration-200 hover:scale-110"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsSection;
