import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Starter Auth App',
      description:
        'A full-stack authentication application with user registration, login, and JWT-based session management.',
      technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
      image: '/image/auth.png',
      githubUrl: 'https://github.com/marayatdev',
      liveUrl: '/auth',
    },
    {
      title: 'Praksaone App',
      description:
        'A comprehensive platform for managing and tracking the pick-up and drop-off of students in Praeksa Subdistrict and connecting with Line API to notify parents.',
      technologies: ['TypeScript', 'Next.js', 'Prisma'],
      image:
        '/image/praksa.png',
      githubUrl: 'https://github.com/marayatdev',
      liveUrl: 'https://praksaone.com/',
    },
    {
      title: 'Test Learning Obec App',
      description:
        'This project is an online test designed to assess English proficiency at the CEFR levels A1 and A2, specifically tailored for students.',
      technologies: ['TypeScript', 'React', 'Express', 'Prisma', 'Docker'],
      image:
        '/image/learning-obec.png',
      githubUrl: 'https://github.com/marayatdev',
      liveUrl: 'https://test.learning-obec.com/',
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="space-y-24 mt-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                <h3 className="text-teal font-mono mb-2">Featured Project</h3>
                <h4 className="text-2xl font-bold text-slate-light mb-4">{project.title}</h4>

                <div className="bg-navy-light p-6 rounded-lg shadow-lg mb-5">
                  <p className="text-slate">{project.description}</p>
                </div>

                <div className={`flex flex-wrap mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={`flex space-x-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate hover:text-teal"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate hover:text-teal"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*  <div className="mt-20 text-center">
          <Button className="bg-transparent border border-teal text-teal hover:bg-teal/10">
            View All Projects
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Projects;
