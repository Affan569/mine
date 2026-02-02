"use client";

import Link from "next/link";
import OrbitTech from "./components/OrbitTech";
import { ScrollReveal } from "./components/ScrollReveal";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen font-sans text-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm uppercase tracking-[0.2em] text-purple-500 dark:text-purple-400 font-bold mb-4"
            >
              Muhammad Affan
            </motion.p>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Turning Ideas
              </span>
              <span className="block text-zinc-800 dark:text-white">
                Into Reality.
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Passionate Web Developer crafting modern, responsive, and user-friendly websites that leave a lasting impression.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link href="/contact" className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <span className="relative z-10">Work With Me</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-purple-500/10"></div>
              </Link>
              <Link href="/projects" className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:scale-105">
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual (Orbit) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            <OrbitTech />
          </motion.div>
        </div>
      </section>

      {/* Social Links Cards */}
      <section className="py-12 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "GitHub", subtitle: "@Affan569", url: "https://github.com/Affan569", color: "hover:border-gray-500 hover:shadow-gray-500/20" },
              { title: "LinkedIn", subtitle: "Muhammad Affan", url: "https://www.linkedin.com/in/muhammad-affan-hussain-siddiqui-1a968139b/", color: "hover:border-blue-500 hover:shadow-blue-500/20" }
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1} width="100%">
                <a
                  href={s.url}
                  target="_blank"
                  className={`flex items-center justify-between p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:scale-[1.02] transition-all duration-300 shadow-sm ${s.color} group`}
                >
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-indigo-500 transition-colors">{s.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">{s.subtitle}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-12 text-center lg:text-left">
              <span className="border-b-4 border-purple-500">Tech Stack</span>
            </h2>
          </ScrollReveal>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {[
              { title: "HTML5", pct: 95 },
              { title: "CSS3", pct: 92 },
              { title: "JavaScript", pct: 90 },
              { title: "React", pct: 88 },
              { title: "Node.js", pct: 85 },
              { title: "PHP", pct: 78 },
              { title: "Tailwind", pct: 89 },
              { title: "MySQL", pct: 80 },
              { title: "MongoDB", pct: 82 },
              { title: "Express", pct: 86 },
            ].map((tech) => (
              <motion.div
                key={tech.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-purple-500/30 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl">
                  {tech.title.substring(0, 2)}
                </div>
                <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">{tech.title}</h3>
                <div className="mt-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.pct}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-4 text-center">What I Do</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center max-w-2xl mx-auto mb-16">
              I help businesses grow by crafting amazing web experiences.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Web Development", desc: "Fast, secure, and scalable websites built with the latest technologies.", icon: "💻" },
              { title: "UI/UX Design", desc: "Intuitive and beautiful interfaces that users love to interact with.", icon: "🎨" },
              { title: "Branding", desc: "Unique visual identities that set you apart from the competition.", icon: "✨" },
            ].map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.2}>
                <div className="h-full p-8 rounded-3xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-500 transition-colors">{service.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal width="100%">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 text-center shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
                <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                  Let's collaborate and build something extraordinary together.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-white text-indigo-600 font-bold py-4 px-10 rounded-full hover:scale-105 hover:shadow-lg transition-transform"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
