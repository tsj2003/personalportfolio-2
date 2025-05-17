
import { Card, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL"]
    },
    {
      title: "Machine Learning/AI",
      skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Keras", "Computer Vision", "NLP"]
    },
    {
      title: "Data Science",
      skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Data Visualization", "Data Analysis"]
    },
    {
      title: "Web Development",
      skills: ["React", "Node.js", "Next.js", "HTML/CSS", "Tailwind CSS", "Express.js"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "Docker", "AWS", "Google Cloud", "Jupyter Notebook", "VS Code"]
    }
  ];

  const SkillBadge = ({ skill }: { skill: string }) => (
    <div className="bg-secondary/50 backdrop-blur-sm border border-primary/10 px-3 py-1 rounded-full text-sm transition-all hover:bg-primary hover:text-white">
      {skill}
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="glass-card overflow-hidden border-0 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="bg-primary/10 p-4 border-b border-primary/20">
                <div className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-medium">{category.title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBadge key={skillIndex} skill={skill} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
