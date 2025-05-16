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
      image:
        'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fGVjb21tZXJjZXxlbnwwfHx8fDE2OTMzNDAxNzl8MA&ixlib=rb-4.0.3&q=80&w=500',
      githubUrl: '#',
      liveUrl: '/auth',
    },
    {
      title: 'Praksaone App',
      description:
        'A comprehensive platform for managing and tracking the pick-up and drop-off of students in Praeksa Subdistrict and connecting with Line API to notify parents.',
      technologies: ['TypeScript', 'Next.js', 'Prisma'],
      image:
        'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8fHwxNjkzMzQwMjUzfDA&ixlib=rb-4.0.3&q=80&w=500',
      githubUrl: '#',
      liveUrl: 'https://praksaone.com/',
    },
    {
      title: 'Test Learning Obec App',
      description:
        'A secure platform for patients to book appointments, access medical records, and communicate with healthcare providers.',
      technologies: ['TypeScript', 'React', 'Express', 'Prisma', 'Docker'],
      image:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aGVhbHRoY2FyZXxlbnwwfHx8fDE2OTMzNDAyOTB8MA&ixlib=rb-4.0.3&q=80&w=500',
      githubUrl: '#',
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
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
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
