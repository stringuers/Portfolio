import { useState } from 'react';
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
      id: 1,
      title: 'IASTAM 5.0',
      date: 'October 2025',
      location: 'Hammamet , Tunisia',
      type: 'conference',
      description: 'I won first place in the Tech Challenge at IASTAM 5 (2025), Tunisia’s leading event for industrial technology. My project DefenSys was recognized for its innovative AI-powered application security solution.',
      achievement: ' First Place in Tech Challenge',
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
      ],
    },
    {
      id: 8,
      title: 'IAC:IEEE IAS 60TH Anniversary',
      date: 'avril 2025',
      location: 'Tunis , Tunisia',
      type: 'conference',
      description: 'IAC:IEEE IAS 60TH Anniversary, a powerful conversation exploring the journey of Tunisia’s industry, the innovations driving change, and the road ahead.',
      achievement: 'A celebration of innovation,teamwork and collaboration',
      images: [
        'https://media.licdn.com/dms/image/v2/D4E22AQHj5UZE-H0QHw/feedshare-shrink_800/B4EZYwraNpHkAg-/0/1744573517837?e=1762992000&v=beta&t=IrOrNhGov0av5hUIrvKmmEmvpeMgweAl9iMmTK6d5P8',
        'https://media.licdn.com/dms/image/v2/D4E22AQFqrq_lNHvixQ/feedshare-shrink_800/B4EZZAW59UHYAg-/0/1744836542474?e=1762992000&v=beta&t=9LEul4puHyPW5mpJrAqRqpgfvPi6R3eQNRbzoUhDNlQ',
        'https://media.licdn.com/dms/image/v2/D4E22AQH248gGQ9atkQ/feedshare-shrink_2048_1536/B4EZY7FKMvHEAw-/0/1744747972607?e=1762992000&v=beta&t=AnB7R8GQ3C-7sBqxA3UTLo8kHwrfNtrhFcfv2YGOp_k',
      ],
    },
    {
      id: 2,
      title: 'Raksha Pentest',
      date: 'Avril 2025',
      location: 'EPI Sousse , Tunisia',
      type: 'hackathon',
      description: '**Raksha Pentest** is an intense **26-hour cybersecurity hackathon** focused on **penetration testing and ethical hacking**. Participants tackle real-world security challenges, exploit vulnerabilities, and defend systems, testing their skills in network, web security under competitive conditions.',
      achievement: '4th Place in Pentest',
      images: [
        'https://media.licdn.com/dms/image/v2/D4E22AQHCkzedUtf35A/feedshare-shrink_2048_1536/B4EZcWimGMHkAw-/0/1748429859640?e=1762992000&v=beta&t=jPbFp9233aHpw8QxINgxVYy6_fKMxrbKa9J43ecIZ5Y',
        'https://media.licdn.com/dms/image/v2/D4E22AQE8XmComDIFGQ/feedshare-shrink_2048_1536/B4EZcWimHJHQAs-/0/1748429860522?e=1762992000&v=beta&t=AFuZYAHyRnTAMpyvZhSR-ihAdph_Z7eeBU7yotqE27U',
        'https://media.licdn.com/dms/image/v2/D4E22AQFkZ2SdwwU39g/feedshare-shrink_2048_1536/B4EZcWimG_H0As-/0/1748429860335?e=1762992000&v=beta&t=-nuUGfMU-TmvniNfe3q22IhzAYpoi7wFMTPlXVhX6TA',
      ],
    },
    {
      id: 3,
      title: 'RedRoom hackathon',
      date: 'Fevrier 2025',
      location: 'ISITCOM,Sousse, Tunisia',
      type: 'hackathon',
      description: 'I secured with my team 3rd place in the RedRoom Hackathon, a challenging cybersecurity competition focused on CTFs, ARGs, and penetration testing, where participants solved advanced security challenges and demonstrated practical offensive and defensive skills.',
      achievement: '3rd Place in CTF,ARG,Pentest',
      images: [
        'https://media.licdn.com/dms/image/v2/D4E22AQFHGt51N_7pkg/feedshare-shrink_800/B4EZYedsX_G0Ag-/0/1744267824684?e=1762992000&v=beta&t=nztMaeYa-xnkaxH4A6CoRbs7tGTjYcgu4AWeopLsJzw',
        'https://media.licdn.com/dms/image/v2/D4E22AQFcVxzXR2lvdQ/feedshare-shrink_800/B4EZYedsYtHUAg-/0/1744267824638?e=1762992000&v=beta&t=RaEW3p-qePwRINivYGJJSEu8mSqFWsryzq6swJDAC3E',
        'https://media.licdn.com/dms/image/v2/D4E22AQG5eGeBM7v8vA/feedshare-shrink_2048_1536/B4EZYedsZTHkAs-/0/1744267827843?e=1762992000&v=beta&t=zuGL4mj-6aKFExLr_eOOoL_JJtUqXtUQyhQQKcW6qPo',
      ],
    },
    {
      id: 4,
      title: 'CyberBenders hackathon',
      date: 'December 2024',
      location: 'EPI Sousse, Tunisia',
      type: 'hackathon',
      description: 'I secured with my team 4th place in the Cyberbunders hackathon, a challenging cybersecurity competition focused on CTFs and AI challenges ',
      achievement: '4th Place in CTF, AI',
      images: [
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        
      ],
    },
    {
      id: 5,
      title: 'React Summit',
      date: 'June 2024',
      location: 'Amsterdam, Netherlands',
      type: 'conference',
      description: 'International conference focused on React ecosystem, modern web development practices, and future trends.',
      images: [
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
      ],
    },
    {
      id: 6,
      title: 'Tech Networking Night',
      date: 'May 2024',
      location: 'Seattle, WA',
      type: 'social',
      description: 'Evening networking event connecting tech professionals, entrepreneurs, and innovators in the Pacific Northwest.',
      images: [
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
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
    </section>
  );
};

export default EventsSection;
