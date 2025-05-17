
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 glass border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-muted-foreground">
              © {currentYear} Tarandeep Singh Juneja. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://github.com/tsj2003" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://www.linkedin.com/in/tarandeep-singh-juneja-55542424b" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="mailto:junejatarandeepsingh@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="tel:+919098520440" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://leetcode.com/u/tarandeepsinghjuneja/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LeetCode"
              >
                <ExternalLink size={20} />
                <span className="sr-only">LeetCode</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://www.geeksforgeeks.org/user/tarandeepfmg2/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GeeksForGeeks"
              >
                <ExternalLink size={20} />
                <span className="sr-only">GeeksForGeeks</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a 
                href="https://www.naukri.com/code360/profile/6b9a9f22-b96f-436e-a3f6-5076ede520e4" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Codestudio"
              >
                <ExternalLink size={20} />
                <span className="sr-only">Codestudio</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
