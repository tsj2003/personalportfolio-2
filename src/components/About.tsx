
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="aspect-square rounded-xl overflow-hidden glass mb-6">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  src="/lovable-uploads/59c32faa-33e1-40fd-9ce5-9ebd484b7991.png" 
                  alt="Tarandeep Singh Juneja" 
                  className="object-cover w-full h-full"
                />
                <AvatarFallback>TSJ</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-primary font-medium">Name:</span>
                <span className="ml-2">Tarandeep Singh Juneja</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary font-medium">Email:</span>
                <span className="ml-2">tarandeep.juneja@gmail.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary font-medium">Education:</span>
                <span className="ml-2">VIT Bhopal, B.Tech CSE</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary font-medium">GPA:</span>
                <span className="ml-2">8.27/10.0</span>
              </div>
              <div className="flex items-center">
                <span className="text-primary font-medium">Availability:</span>
                <span className="ml-2">Open to opportunities</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-lg">
              I'm a Computer Science student at Vellore Institute of Technology, Bhopal with a passion for web development
              and modern technologies. My coursework includes Data Structures, Algorithms, Operating Systems, Computer Networks, 
              and Database Management Systems.
            </p>
            
            <p className="text-lg">
              As a <span className="text-primary">FOSSEE Summer Intern at IIT Bombay</span> (Feb 2025 - April 2025), I developed a UI for
              Osdag software, focusing on plate girder design to enhance usability. I also worked on Butt joint bolted connections
              calculations and integrating them in the UI Module, contributing to structural design improvements.
            </p>
            
            <p className="text-lg">
              My technical skills include Data Structures & Algorithms, JavaScript, TypeScript, C++, Python, Next.js, React,
              Node.js, Tailwind CSS, Supabase, Git, GitHub, Postman, AWS (basics), Roboflow, and LINUX (basics).
            </p>
            
            <div className="pt-4">
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    });
                  }
                }}
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Let's connect
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
