import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Linkedin, Github, Instagram } from "lucide-react";
import ScrollEffects from "./ScrollEffects";
import TypewriterText from "./TypewriterText";

const Contact = () => {
  const openScheduleEmail = () => {
    const to = 'delight.cherubino@gmail.com';
    const subject = encodeURIComponent('Schedule a Call');
    const body = encodeURIComponent(
      'Hi Delight,\n\nI would like to schedule a call to discuss...\n\nPreferred times:'
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "delightcherubino@gmail.com",
      href: "mailto:delightcherubino@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8220789878",
      href: "tel:+918220789878"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Munnar, India",
      href: "https://www.google.com/maps/search/?api=1&query=Munnar%2C%20India"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/delight-cherubino",
      icon: Linkedin
    },
    {
      name: "GitHub",
      href: "https://github.com/delight-cherubino",
      icon: Github
    },
    {
      name: "Instagram",
      href: "https://instagram.com/delight_cherubino",
      icon: Instagram
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <ScrollEffects effect="fadeIn" delay={200} duration={800}>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              <TypewriterText 
                text="Let's Work Together"
                speed={100}
                delay={300}
                className="text-foreground"
              />
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your vision to life? Get in touch and let's create something amazing together.
            </p>
          </div>
        </ScrollEffects>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollEffects effect="slideLeft" delay={500} duration={800}>
            <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);
                    const payload = {
                      firstName: formData.get('firstName'),
                      lastName: formData.get('lastName'),
                      email: formData.get('email'),
                      subject: formData.get('subject'),
                      message: formData.get('message')
                    };

                    try {
                      const apiBase = import.meta.env.VITE_API_BASE || '';
                      const response = await fetch(`${apiBase}/api/mail`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                      });
                      
                      if (response.ok) {
                        alert('Message sent successfully!');
                        form.reset();
                      } else {
                        alert('Failed to send message. Please try again.');
                      }
                    } catch (error) {
                      alert('Failed to send message. Please try again.');
                    }
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        placeholder="John" 
                        className="border-nature-primary/20 focus:border-primary transition-colors duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        placeholder="Doe" 
                        className="border-nature-primary/20 focus:border-primary transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="john@example.com" 
                      className="border-nature-primary/20 focus:border-primary transition-colors duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      placeholder="Project Inquiry" 
                      className="border-nature-primary/20 focus:border-primary transition-colors duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={6}
                      className="border-nature-primary/20 focus:border-primary transition-colors duration-200 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-nature hover:shadow-warm transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollEffects>

          {/* Contact Information */}
          <ScrollEffects effect="slideRight" delay={600} duration={800}>
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Get in Touch</CardTitle>
                  <CardDescription>
                    Here are the best ways to reach me for collaborations and inquiries.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-center space-x-3 group">
                      <div className="p-2 rounded-lg bg-nature-sage text-nature-primary">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.title}</p>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            className="text-nature-primary hover:text-nature-accent transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Removed Resume Download section as requested */}

              {/* Social Links */}
              <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Connect With Me</CardTitle>
                  <CardDescription>
                    Follow my journey and connect on social platforms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <Button
                        key={social.name}
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-nature-primary/20 text-nature-primary hover:bg-nature-primary/10 transition-colors duration-200"
                      >
                        <a 
                          href={social.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <social.icon className="w-4 h-4" />
                          {social.name}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="border-0 shadow-elegant bg-gradient-warm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">Available for Projects</h3>
                  <p className="text-white/90 mb-4">
                    I'm currently accepting new projects and collaborations.
                  </p>
                  <Button 
                    variant="secondary" 
                    onClick={openScheduleEmail}
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                  >
                    Schedule a Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollEffects>
        </div>
      </div>
    </section>
  );
};

export default Contact;