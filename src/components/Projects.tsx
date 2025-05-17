
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "Remote Interview Platform",
      description: "Built a full-stack interview platform with real-time video conferencing, screen sharing, and recording features. Implemented secure authentication with Clerk and real-time data sync using Convex. Created a modern UI with Tailwind CSS and Shadcn UI components.",
      tags: ["Next.js 14", "TypeScript", "Stream API", "Convex", "Clerk", "Tailwind CSS", "Shadcn UI"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      title: "Task Management System",
      description: "Created a task management system that demonstrates practical use of data structures and algorithms. The application uses Priority Queue (Min Heap) for task prioritization, Linked List for sequential task storage and traversal, Binary Search for task filtering, and efficient sorting algorithms for different task views.",
      tags: ["Data Structures", "Algorithms", "Supabase", "React", "TypeScript", "Tailwind CSS"],
      demoLink: "#",
      codeLink: "#",
      features: [
        "Task creation with priority levels",
        "Real-time search and filtering",
        "Category-based organization",
        "Priority-based task ordering",
        "Clean, responsive UI with dark mode support"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="glass-card border-0 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="bg-primary/10 border-b border-primary/20">
                <CardTitle className="text-xl flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" />
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.tags.join(" • ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>{project.description}</p>
                {project.features && (
                  <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-primary/10 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Demo</Button>
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
