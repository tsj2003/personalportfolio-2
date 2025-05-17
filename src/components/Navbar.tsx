import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Download, Code, User, List } from "lucide-react";

const NavLink = ({ href, text, onClick }: { href: string; text: string; onClick?: () => void }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: "smooth",
          });
        }
        if (onClick) onClick();
      }}
      className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      {text}
    </a>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="font-bold text-xl text-gradient">Portfolio</a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="#about" text="About" />
            <NavLink href="#skills" text="Skills" />
            <NavLink href="#projects" text="Projects" />
            <NavLink href="#experience" text="Experience" />
            <NavLink href="#contact" text="Contact" />
            <ThemeToggle />
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-64 glass shadow-xl transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            <NavLink href="#about" text="About" onClick={closeMobileMenu} />
            <NavLink href="#skills" text="Skills" onClick={closeMobileMenu} />
            <NavLink href="#projects" text="Projects" onClick={closeMobileMenu} />
            <NavLink href="#experience" text="Experience" onClick={closeMobileMenu} />
            <NavLink href="#contact" text="Contact" onClick={closeMobileMenu} />
          </nav>
        </div>
      </div>
    </header>
  );
};
