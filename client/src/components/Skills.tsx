
import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "PHP"]
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Prisma", "MongoDB"]
    },
    {
      title: "DevOps & Others",
      skills: ["Git", "GitLab", "Docker", "kubernetes", "Nginx"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-navy-light">
      <div className="section-container">
        <h2 className="section-title">Skills</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-navy p-6 rounded-lg shadow-lg border border-navy-light hover:border-teal/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-teal">{category.title}</h3>
              <div className="flex flex-wrap">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate text-lg max-w-2xl mx-auto">
            I'm constantly learning and exploring new technologies to expand my skill set
            and stay up-to-date with industry trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
