
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "FOSSEE Summer Intern",
      company: "IIT Bombay",
      period: "Feb 2025 - April 2025",
      description: "Developed a UI for the Osdag software, focusing on plate girder design to enhance usability. Currently working on Butt joint bolted connections calculations part and integrating them in UI Module, contributing to structural design improvements.",
      skills: ["UI Development", "Software Design", "Engineering Tools"]
    },
    {
      title: "AI Developer",
      company: "Omdena x VIT Bhopal",
      period: "Jan 2023 - Present",
      description: "Working on an AI-based road inspection project, training datasets using Roboflow to detect road defects and hazards. Developed computer vision algorithms for real-time defect detection with high accuracy.",
      skills: ["Computer Vision", "Roboflow", "AI", "Python"]
    }
  ];

  const certifications = [
    "HTML, CSS, and JavaScript for Web Developers (Coursera, Dec 2023)",
    "Python Essentials, AI and ML Fundamentals (Vityarthi)",
    "Cloud Computing (NPTEL)",
    "Oracle's Databases for Developers certification",
    "Postman API Fundamentals certification"
  ];

  const achievements = [
    "Adobe GenSolve Hackathon Finalist: Reached finalist status out of 200+ participants",
    "Industry Conclave Buildathon (Top 5): Achieved top 5 among competitive teams",
    "Skills India National Competition Qualifier (Cloud Computing): Advanced to the State level"
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Experience</h2>
        
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-10 h-10 rounded-full bg-primary shadow-lg shadow-primary/20">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                
                {/* Card - takes 45% width on each side with gap */}
                <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                  <Card className="glass-card border-0 overflow-hidden">
                    <CardHeader className="bg-primary/10 border-b border-primary/20">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription>{exp.company} | {exp.period}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="mb-4">{exp.description}</p>
                      <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="bg-primary/10 text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Empty div for layout on alternate sides */}
                <div className="hidden md:block w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Certifications & Achievements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card border-0 overflow-hidden">
              <CardHeader className="bg-primary/10 border-b border-primary/20">
                <CardTitle className="text-xl">Certifications</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 list-disc pl-5">
                  {certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 overflow-hidden">
              <CardHeader className="bg-primary/10 border-b border-primary/20">
                <CardTitle className="text-xl">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 list-disc pl-5">
                  {achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
