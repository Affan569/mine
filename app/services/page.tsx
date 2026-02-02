import Link from "next/link";

export default function Services() {
  const services = [
    { title: "Web Development", desc: "Building fast, responsive, and secure websites tailored to your needs. From concept to launch, I make your vision a reality." },
    { title: "UI/UX Design", desc: "Designing intuitive interfaces and seamless user experiences that engage and delight your audience." },
    { title: "Branding & Identity", desc: "Creating memorable brand identities with logos, color palettes, and visuals that tell your story." },
  ];
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Services</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">I help brands and businesses build experiences that convert.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-lg transition">
              <p className="text-lg font-medium">{s.title}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{s.desc}</p>
              <div className="mt-4 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/contact" className="rounded-md bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 text-white px-5 py-2">Work With Me</Link>
        </div>
      </div>
    </div>
  );
}
