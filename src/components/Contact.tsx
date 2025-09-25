import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Linkedin, Github, Instagram } from "lucide-react";

const Contact = () => {
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
      href: "tel:+91 8220789878"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "munnar, kerala",
      href: "https://www.google.com/maps/place/Munnar,+Kerala+685612/@10.0806494,77.0538781,15z/data=!3m1!4b1!4m6!3m5!1s0x3b0799794d099a6d:0x63250e5553c7e0c!8m2!3d10.0889333!4d77.0595248!16zL20vMDFydmpi?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/delight-cherubino-bb8456291", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Cherubinoo", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/cherubino.97x/", label: "Instagram" }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Get in touch and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm animate-fade-in-left">
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
                    message: formData.get('message'),
                  };
                  try {
                    const res = await fetch('/api/mail', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) throw new Error('Failed');
                    alert('Message sent!');
                    form.reset();
                  } catch (err) {
                    alert('Send failed. Please try again later.');
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

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up">
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
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
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

            {/* Social Links */}
            <Card className="border-0 shadow-elegant bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Follow My Work</CardTitle>
                <CardDescription>
                  Connect with me on social media for updates and behind-the-scenes content.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-nature-sage hover:bg-primary text-nature-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-elegant"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
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
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  Schedule a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;