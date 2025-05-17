
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, ExternalLink, Github, Linkedin, Phone } from "lucide-react";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    { 
      icon: <Mail className="w-5 h-5 text-primary" />, 
      title: "Email", 
      value: "junejatarandeepsingh@gmail.com",
      link: "mailto:junejatarandeepsingh@gmail.com"
    },
    { 
      icon: <Phone className="w-5 h-5 text-primary" />, 
      title: "Phone", 
      value: "+91 9098520440",
      link: "tel:+919098520440"
    },
    { 
      icon: <Github className="w-5 h-5 text-primary" />, 
      title: "GitHub", 
      value: "github.com/tsj2003",
      link: "https://github.com/tsj2003"
    },
    { 
      icon: <Linkedin className="w-5 h-5 text-primary" />, 
      title: "LinkedIn", 
      value: "linkedin.com/in/tarandeep-singh-juneja",
      link: "https://www.linkedin.com/in/tarandeep-singh-juneja-55542424b"
    },
    { 
      icon: <ExternalLink className="w-5 h-5 text-primary" />, 
      title: "Codestudio", 
      value: "Naukri Codestudio",
      link: "https://www.naukri.com/code360/profile/6b9a9f22-b96f-436e-a3f6-5076ede520e4"
    },
    { 
      icon: <ExternalLink className="w-5 h-5 text-primary" />, 
      title: "LeetCode", 
      value: "leetcode.com/u/tarandeepsinghjuneja",
      link: "https://leetcode.com/u/tarandeepsinghjuneja/"
    },
    { 
      icon: <ExternalLink className="w-5 h-5 text-primary" />, 
      title: "GeeksForGeeks", 
      value: "geeksforgeeks.org/user/tarandeepfmg2",
      link: "https://www.geeksforgeeks.org/user/tarandeepfmg2/"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fade-in">
            <Card className="glass-card border-0 h-full">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to me through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.link}
                    className="flex items-center p-4 rounded-lg bg-secondary/30 backdrop-blur-sm hover:bg-primary/20 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
                <CardDescription>I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="glass"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="glass"
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="glass"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="glass resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
