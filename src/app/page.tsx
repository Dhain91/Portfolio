"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { portfolioData, type Project, type Highlight } from "@/lib/data";

/*
  HOME PAGE
  Includes:
  - Hero Section (Two-Layer Reveal via 'HeroSection' component)
  - Content Sections (Details)
*/

export default function Home() {
  // Ensure Next.js hash routing works nicely with Framer Motion mount delays
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground overflow-x-hidden">

      {/* HERO SECTION */}
      <HeroSection />

      {/* 
        CONTENT BELOW HERO
      */}
      <div className="w-full bg-slate-950 text-slate-50 flex flex-col items-center">

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          id="about"
          className="pt-52 md:pt-72 pb-24 w-full max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left Column: Bio */}
            <div className="space-y-12">
              <h2 className="text-5xl md:text-6xl font-bold text-teal-200 leading-none">About Me</h2>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>{portfolioData.about.intro}</p>
                <p>{portfolioData.about.experience}</p>
                <p>{portfolioData.about.personal}</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-teal-500/10 text-teal-300 border border-teal-500/50 rounded-xl font-medium hover:bg-teal-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                  View CV
                </a>
                <a
                  href="/references.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-medium hover:bg-slate-700 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  View References
                </a>
              </div>
            </div>

            {/* Right Column: Photo + Highlights */}
            <div className="space-y-8">

              {/* Photo Container */}
              <div className="w-2/3 mx-auto relative group rounded-2xl overflow-hidden border-2 border-slate-800 hover:border-teal-500/50 transition-all duration-300 bg-slate-900 aspect-square flex items-center justify-center shadow-2xl">
                <div className="flex items-center justify-center text-slate-500 text-sm font-medium animate-pulse text-center px-4">
                  Currently unavailable
                </div>
              </div>

              {/* Highlights / Info Card */}
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-6">Quick Highlights</h3>
                <ul className="space-y-4">
                  {portfolioData.about.highlights.map((item: Highlight, i: number) => (
                    <li key={i} className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-teal-400 font-medium text-right">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-12 w-full max-w-7xl mx-auto px-6"
        >
          <div className="bg-slate-900/50 rounded-xl p-10 border border-slate-800 mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-blue-200">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {portfolioData.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-slate-800 rounded-lg text-center font-mono text-lg hover:bg-slate-700 transition-colors cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <section id="projects" className="py-32 w-full max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-teal-200 leading-none">Projects</h2>

          <div className="flex flex-col gap-16">
            {/* Freelance Work Subtitle */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 text-blue-200 border-b border-slate-800 pb-4">Freelance Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.filter(p => p.type === 'freelance').map((project: Project) => (
                  <motion.div
                    key={project.slug}
                    whileHover={{ y: -5 }}
                    className="group rounded-xl border border-slate-800 bg-slate-900 p-8 transition-all hover:bg-slate-800"
                  >
                    <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mb-6 text-base text-slate-400">
                      {project.shortDescription}
                    </p>
                    <Link href={`/projects/${project.slug}`} className="text-blue-400 hover:text-blue-300 font-medium text-lg">
                      View Details &rarr;
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Personal Projects Subtitle */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 text-blue-200 border-b border-slate-800 pb-4">Personal Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.projects.filter(p => p.type === 'personal').map((project: Project) => (
                  <motion.div
                    key={project.slug}
                    whileHover={{ y: -5 }}
                    className="group rounded-xl border border-slate-800 bg-slate-900 p-8 transition-all hover:bg-slate-800"
                  >
                    <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
                    <p className="mb-6 text-base text-slate-400">
                      {project.shortDescription}
                    </p>
                    <Link href={`/projects/${project.slug}`} className="text-blue-400 hover:text-blue-300 font-medium text-lg">
                      View Details &rarr;
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Section */}
        <section id="contact" className="py-32 w-full max-w-7xl mx-auto px-6 mb-20">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-teal-200 leading-none">Get In Touch</h2>
            <p className="text-xl leading-relaxed text-slate-300 max-w-3xl">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
              I'll get back to you!
            </p>
            <div className="mt-10">
              <Link href="mailto:dhainsaeed19@gmail.com" className="px-10 py-5 bg-transparent border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors text-lg">
                Say Hello
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </main >
  );
}
