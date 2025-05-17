import { Button } from "@/components/ui/button";
import { User, Download, Code, Mail, Phone, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Hero = () => {
  return (
    <section className="min-h-screen pt-24 pb-12 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent z-0 opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gradient">Hello, I'm</span>
              <span className="block mt-2">Tarandeep Singh Juneja</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-muted-foreground">
              Computer Science Student & Developer
            </p>
            <p className="mb-8 text-muted-foreground max-w-lg">
              I'm passionate about building web applications and solving real-world problems. Currently pursuing B.Tech in Computer Science at Vellore Institute of Technology, Bhopal with experience in Next.js, React, and TypeScript.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  const element = document.getElementById('about');
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <User className="mr-2 h-5 w-5" /> About Me
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <a href="mailto:junejatarandeepsingh@gmail.com" className="flex items-center hover:text-primary transition-colors">
                <Mail className="mr-2 h-5 w-5" /> junejatarandeepsingh@gmail.com
              </a>
              <a href="tel:+919098520440" className="flex items-center hover:text-primary transition-colors">
                <Phone className="mr-2 h-5 w-5" /> +91 9098520440
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden glass-card border-4 border-primary/30 relative">
                <Avatar className="w-full h-full">
                  <AvatarImage src="/lovable-uploads/59c32faa-33e1-40fd-9ce5-9ebd484b7991.png" alt="Tarandeep Singh Juneja" className="object-cover w-full h-full" />
                  <AvatarFallback>TSJ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <a 
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('about');
              if (element) {
                window.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: "smooth",
                });
              }
            }}
            className="animate-bounce"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
