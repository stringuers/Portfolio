import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Trophy, Users, RotateCcw, Award } from 'lucide-react';

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
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const events: Event[] = [
    {
      id: 101,
      title: 'IEEEXtreme 19.0',
      date: '2025',
      location: 'Global (Online)',
      type: 'hackathon',
      description: '24 hours of non-stop competitive programming at IEEEXtreme! Solving algorithms, debugging at 3 AM, and pushing our limits.',
      achievement: 'Participant and completed all challenges',
      images: ['public/images/extreeme.jpg'],
    },
    {
      id: 1,
      title: 'IASTAM 5.0',
      date: 'October 2025',
      location: 'Hammamet, Tunisia',
      type: 'conference',
      description: 'I won first place in the Tech Challenge at IASTAM 5 (2025), leading event for industrial technology. My project DefenSys was recognized for innovative AI-powered application security.',
      achievement: 'First Place in Tech Challenge',
      images: ['public/images/iastam1.jpeg', 'public/images/iastam2.jpeg', 'public/images/iastam3.jpeg'],
    },
    {
      id: 8,
      title: 'IAC:IEEE IAS 60TH Anniversary',
      date: 'Avril 2025',
      location: 'Tunis, Tunisia',
      type: 'conference',
      description: 'IAC:IEEE IAS 60TH Anniversary, a powerful conversation exploring industrial journey, innovations driving change, and the road ahead.',
      achievement: 'Celebration of innovation, teamwork and collaboration',
      images: ['public/images/iac1.jpeg', 'public/images/iac2.jpg'],
    },
    {
      id: 2,
      title: 'Raksha Pentest',
      date: 'Avril 2025',
      location: 'EPI Sousse, Tunisia',
      type: 'hackathon',
      description: 'Raksha Pentest is an intense 26-hour cybersecurity hackathon focused on penetration testing and ethical hacking.',
      achievement: '4th Place in Pentest',
      images: ['public/images/raksha1.jpeg', 'public/images/raksha2.jpeg', 'public/images/raksha3.jpeg'],
    },
    {
      id: 3,
      title: 'RedRoom hackathon',
      date: 'Fevrier 2025',
      location: 'ISITCOM, Sousse, Tunisia',
      type: 'hackathon',
      description: 'Secured 3rd place in RedRoom Hackathon, a challenging cybersecurity competition focused on CTFs and penetration testing.',
      achievement: '3rd Place in CTF, ARG, Pentest',
      images: ['public/images/redroom1.jpeg', 'public/images/redroom2.jpeg', 'public/images/redroom3.jpeg'],
    },
    {
      id: 4,
      title: 'CyberBenders hackathon',
      date: 'December 2024',
      location: 'EPI Sousse, Tunisia',
      type: 'hackathon',
      description: 'Secured 4th place with team in Cyberbenders hackathon, a challenging cybersecurity competition focused on CTFs and AI challenges.',
      achievement: '4th Place in CTF, AI',
      images: [],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'bg-accent text-accent-foreground';
      case 'conference':
        return 'bg-primary text-primary-foreground';
      case 'social':
        return 'bg-secondary text-secondary-foreground';
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

  const handleCardClick = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
    <section id="events" className="relative z-10 py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center space-y-4 mb-20">
              <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
              <h2 className="text-4xl md:text-6xl font-bold">
                Events & <span className="text-accent">Experiences</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Hackathons, conferences, and networking events that shaped my journey
              </p>
            </div>

            {/* Events Grid - Fixed Layout */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event, index) => {
                const isFlipped = flippedCards.has(event.id);

                return (
                  <div
                    key={event.id}
                    className="flip-card-container flying-card h-[500px]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                      onClick={() => handleCardClick(event.id)}
                    >
                      {/* Front of Card */}
                      <div className="flip-card-front">
                        <Card className="h-full overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <CardContent className="p-0 h-full flex flex-col">
                            {/* Image Section */}
                            {event.images.length > 0 && (
                              <div className="relative h-48 bg-muted/30 overflow-hidden">
                                <div className="grid grid-cols-2 gap-1 h-full p-2">
                                  {event.images.slice(0, 4).map((image, imgIndex) => (
                                    <div
                                      key={imgIndex}
                                      className={`relative overflow-hidden rounded ${
                                        event.images.length === 1 ? 'col-span-2' : ''
                                      } ${event.images.length === 3 && imgIndex === 0 ? 'row-span-2' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(image);
                                      }}
                                    >
                                      <img
                                        src={image}
                                        alt={`${event.title} - ${imgIndex + 1}`}
                                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center gap-2 flex-wrap mb-3">
                                <Badge className={`${getTypeColor(event.type)} flex items-center gap-1 text-xs`}>
                                  {getTypeIcon(event.type)}
                                  <span className="capitalize">{event.type}</span>
                                </Badge>
                                {event.achievement && (
                                  <Badge variant="outline" className="border-accent text-accent text-xs">
                                    {event.achievement}
                                  </Badge>
                                )}
                              </div>

                              <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                                {event.title}
                              </h3>

                              <div className="space-y-2 text-foreground/70 mb-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-accent" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-accent" />
                                  <span>{event.location}</span>
                                </div>
                              </div>

                              <p className="text-foreground/80 leading-relaxed line-clamp-3 text-sm mb-4 flex-grow">
                                {event.description}
                              </p>

                              {/* Flip hint */}
                              <div className="text-center pt-3 border-t border-border/50 mt-auto">
                                <p className="text-xs text-foreground/50 flex items-center justify-center gap-1.5">
                                  <RotateCcw className="w-3 h-3" />
                                  Click for details
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Back of Card */}
                      <div className="flip-card-back">
                        <Card className="h-full overflow-hidden border-2 border-accent/20 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 backdrop-blur-sm shadow-xl">
                          <CardContent className="p-6 h-full flex flex-col overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-5 flex-shrink-0">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-accent mb-1">
                                  {event.title}
                                </h3>
                                <p className="text-xs text-foreground/60">Event Details</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardClick(event.id);
                                }}
                                className="h-7 w-7 hover:bg-accent/10 flex-shrink-0"
                              >
                                <RotateCcw className="w-3.5 h-3.5 text-accent" />
                              </Button>
                            </div>

                            {/* Achievement Highlight */}
                            {event.achievement && (
                              <div className="mb-5 p-3 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Award className="w-4 h-4 text-accent" />
                                  <p className="text-xs font-semibold text-accent">Achievement</p>
                                </div>
                                <p className="text-sm font-bold text-foreground">
                                  {event.achievement}
                                </p>
                              </div>
                            )}

                            {/* Event Info */}
                            <div className="mb-5 space-y-3 flex-shrink-0">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                                <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-foreground/60 mb-0.5">Date</p>
                                  <p className="text-sm font-semibold text-foreground">{event.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-foreground/60 mb-0.5">Location</p>
                                  <p className="text-sm font-semibold text-foreground">{event.location}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50">
                                <Badge className={`${getTypeColor(event.type)} flex items-center gap-1 text-xs`}>
                                  {getTypeIcon(event.type)}
                                  <span className="capitalize">{event.type}</span>
                                </Badge>
                              </div>
                            </div>

                            {/* Full Description */}
                            <div className="mb-5 flex-1">
                              <p className="text-xs font-semibold text-foreground mb-2">About This Event</p>
                              <p className="text-sm text-foreground/80 leading-relaxed">
                                {event.description}
                              </p>
                            </div>

                            {/* Image count */}
                            {event.images.length > 0 && (
                              <div className="pt-3 border-t border-border/50 flex-shrink-0">
                                <p className="text-xs text-foreground/60">
                                  {event.images.length} photo{event.images.length > 1 ? 's' : ''} available - click images on front to view
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      </section>

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
    </>
  );
};

export default EventsSection;
