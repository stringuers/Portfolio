import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out! I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kilenimoemen2004@gmail.com',
      href: 'mailto:kilenimoemen2004@gmail.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/stringuers',
      href: 'https://github.com/stringuers',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'abdelmoemen-kilani',
      href: 'https://www.linkedin.com/in/abdelmoemen-kilani-030756295/',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Tunis, Tunisia',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="relative z-10 py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block w-16 h-0.5 bg-accent mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 bg-card/60 backdrop-blur-sm border border-border hover:border-accent/30 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border focus:border-accent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-border focus:border-accent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or idea..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-border focus:border-accent transition-colors resize-none"
                  required
                />
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;

              return (
                <Card
                  key={index}
                  className="p-6 bg-card/60 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 bg-accent/10 rounded-xl border border-accent/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">{info.label}</h3>
                      <p className="text-foreground/70 group-hover:text-foreground transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                </Card>
              );
            })}

            {/* Fun Card */}
            <Card className="p-6 bg-gradient-primary text-primary-foreground border-0 shadow-glow-primary">
              <p className="text-sm font-mono mb-2 opacity-90">$ whoami</p>
              <p className="text-xl font-bold mb-2">Abdelmoemen Kilani</p>
              <p className="text-sm opacity-90 leading-relaxed">
                Building the future, one line of code at a time 🚀
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
