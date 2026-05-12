"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { portfolioData, type Project } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const project = portfolioData.projects.find((p) => p.slug === params.slug) as Project | undefined;
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground bg-slate-950 flex flex-col items-center">

      {/* Dynamic Animated Header */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-0"></div>

        <motion.div
          className="z-10 text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-teal-300 hover:border-teal-500/50 transition-all text-sm mb-8 backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Portfolio
            </Link>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-blue-400 mb-6 drop-shadow-lg">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {project.shortDescription}
          </p>
        </motion.div>
      </section>

      {/* Project content */}
      <section className="w-full max-w-4xl mx-auto px-6 py-24 z-10 flex flex-col gap-16">

        {/* Full description */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-teal-200">The Vision</h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            {project.fullDescription}
          </p>
        </motion.div>

        {/* Features */}
        {project.features && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-teal-200">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Image Gallery */}
        {(project as any).images && (project as any).images.length > 0 && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-teal-200">Gallery</h2>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-800 group shadow-2xl">
              <img
                src={project.images[currentImageIdx]}
                alt={`${project.title} screenshot ${currentImageIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIdx(prev => (prev === 0 ? project.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-slate-900/50 text-white backdrop-blur border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900/80 hover:scale-105"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIdx(prev => (prev === project.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-slate-900/50 text-white backdrop-blur border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900/80 hover:scale-105"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIdx(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${currentImageIdx === idx ? 'bg-teal-400' : 'bg-white/30'}`}
                        aria-label={`Jump to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Detailed Functionality */}
        {project.detailedFunctionality && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-teal-200">Technical Depth</h2>
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 text-slate-300 text-lg leading-relaxed shadow-inner whitespace-pre-wrap">
              {project.detailedFunctionality}
            </div>
          </motion.div>
        )}

        {/* Tech Stack used */}
        <motion.div
          className="space-y-8 p-10 bg-slate-900/40 border border-slate-800 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-blue-200">Technologies Used</h2>
          <div className="flex flex-wrap gap-4">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2.5 bg-slate-800 text-slate-200 font-mono text-sm shadow-sm rounded-lg border border-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Action Links */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-4 bg-teal-500/10 text-teal-300 border border-teal-500/50 rounded-xl font-medium hover:bg-teal-500/20 hover:scale-[1.02] transition-all"
            >
              Live Demo &rarr;
            </a>
          ) : (
            <div className="flex-1 text-center py-4 bg-slate-800/50 text-slate-500 border border-slate-800 rounded-xl font-medium cursor-not-allowed">
              Live Demo Unavailable
            </div>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-medium hover:bg-slate-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View Repository
            </a>
          ) : (
            <div className="flex-1 text-center py-4 bg-slate-800/50 text-slate-500 border border-slate-700/50 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Repository Unavailable
            </div>
          )}
        </motion.div>

      </section>
    </main>
  );
}
