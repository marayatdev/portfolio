
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          <div className="md:col-span-2 text-slate">
            <p className="mb-4">
              Hello! I'm a passionate software developer with a strong foundation in both frontend and backend technologies. 
              My journey in programming began during my university days, and I've been hooked ever since.
            </p>
            
            <p className="mb-4">
              I enjoy creating elegant, efficient, and user-friendly applications that solve real-world problems. 
              My approach to development combines technical expertise with creative problem-solving, 
              ensuring that the end product is not only functional but also intuitive and enjoyable to use.
            </p>
            
            <p className="mb-4">
              Beyond coding, I'm committed to continuous learning and staying updated with the latest industry trends. 
              Whether it's exploring new frameworks, learning about best practices, or optimizing performance, 
              I'm always looking to improve and expand my skill set.
            </p>
            
            <p>
              When I'm not coding, you might find me hiking, reading about new technologies, 
              or contributing to open-source projects. I'm always open to new opportunities and collaborations, 
              so feel free to reach out!
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-teal rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHByb2dyYW1tZXJ8ZW58MHx8fHwxNjkzMzM5MTk0fDA&ixlib=rb-4.0.3&q=80&w=400" 
                alt="Developer" 
                className="w-full h-auto rounded-lg transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
