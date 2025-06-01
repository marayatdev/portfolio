
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin } from "lucide-react";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be where you'd handle the form submission
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 bg-navy-light">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          <div>
            <p className="text-slate text-lg mb-8">
              I'm currently open to new opportunities and collaborations. Whether you have a question,
              a project in mind, or just want to say hi, my inbox is always open!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-slate-light">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="bg-navy border-navy-light text-slate-light focus:border-teal"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-slate-light">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="bg-navy border-navy-light text-slate-light focus:border-teal"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-slate-light">Message</label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  required
                  className="bg-navy border-navy-light text-slate-light focus:border-teal min-h-[150px]"
                />
              </div>

              <Button type="submit" className="bg-teal text-navy hover:bg-teal/80">
                Send Message
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start">
            <div className="space-y-8 max-w-md">
              <div>
                <h3 className="text-xl font-semibold text-slate-light mb-2">Contact Info</h3>
                <p className="text-slate flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> chawalit.work.2001@gmail.com
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-light mb-2">Social Links</h3>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon" className="text-slate hover:text-teal" asChild>
                    <a href="https://github.com/marayatdev" target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate hover:text-teal" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-light mb-2">Location</h3>
                <p className="text-slate">Suphanburi, Thailand</p>
              </div>

              <div className="pt-6">
                <div className="p-1 rounded-lg bg-gradient-to-r from-teal to-teal/30">
                  <div className="bg-navy-light p-5 rounded-md">
                    <p className="text-slate-light italic">
                      "Programming isn't about what you know; it's about what you can figure out."
                    </p>
                    <p className="mt-2 text-teal text-right">- Marayat Dev</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
