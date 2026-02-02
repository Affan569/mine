"use client";
import { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mailStatus, setMailStatus] = useState<"ok" | "fail" | undefined>(undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMailStatus(undefined);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/contact", { 
        method: "POST", 
        body: fd 
      });

      const json = await res.json();

      if (res.ok && json.ok) {
        setMailStatus("ok");
        setShowSuccess(true);
        form.reset();
      } else {
        setMailStatus("fail");
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMailStatus("fail");
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16 relative z-10 w-full">
        <ScrollReveal width="100%">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Get In Touch
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        {/* Status Message Box */}
        {showSuccess && (
          <ScrollReveal width="100%">
            <div className={`mb-8 rounded-xl p-6 border backdrop-blur-sm shadow-sm transition-all duration-500 ${
              mailStatus === "ok" 
                ? "bg-green-50/80 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                : "bg-red-50/80 border-red-200 dark:bg-red-900/20 dark:border-red-800"
            }`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-full p-2 ${
                  mailStatus === "ok" ? "bg-green-100 dark:bg-green-800/50" : "bg-red-100 dark:bg-red-800/50"
                }`}>
                  {mailStatus === "ok" ? (
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-medium ${mailStatus === "ok" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                    {mailStatus === "ok" ? "Message Sent!" : "Sending Failed!"}
                  </h3>
                  <p className={`text-sm ${mailStatus === "ok" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                    {mailStatus === "ok" 
                      ? "Thanks for reaching out. I'll get back to you as soon as possible." 
                      : "Could not send email. Please check your connection or email me directly."}
                  </p>
                </div>
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="ml-auto text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-4">
            {[
              { title: "GitHub", val: "Affan569", url: "https://github.com/Affan569", label: "G" },
              { title: "Email", val: "affanzahid612@gmail.com", url: "mailto:affanzahid612@gmail.com", label: "E" },
              { title: "Phone", val: "+92 314 886 2881", url: "tel:+923148862881", label: "P" },
              { title: "LinkedIn", val: "Muhammad Affan", url: "https://linkedin.com/in/your-profile", label: "L" }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} width="100%">
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 group backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      <span className="font-bold text-lg">{item.label}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.title}</p>
                      <p className="text-zinc-900 dark:text-zinc-100 font-semibold break-all text-sm">{item.val}</p>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ScrollReveal width="100%" delay={0.2}>
              <form onSubmit={onSubmit} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 p-8 shadow-xl backdrop-blur-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                    <input 
                      name="name" 
                      autoComplete="name"
                      placeholder="Your name" 
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      autoComplete="email"
                      placeholder="john@example.com" 
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all dark:text-white" 
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-8">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                  <textarea 
                    name="message" 
                    placeholder="Tell me about your project..." 
                    className="w-full h-40 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none dark:text-white" 
                    required
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                    ${isSubmitting 
                      ? "bg-zinc-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}