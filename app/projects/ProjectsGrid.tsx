"use client";
import { useMemo, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  url?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  tags?: string[];
  createdAt: string;
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  const [selected, setSelected] = useState<number>(0);
  const tags = useMemo(() => {
    const s = new Set<string>();
    for (const p of projects) {
      for (const t of (p.technologies ?? p.tags ?? [])) s.add(t);
    }
    return ["All", ...Array.from(s)];
  }, [projects]);
  const [activeTag, setActiveTag] = useState<string>("All");
  const filtered = useMemo(() => {
    if (activeTag === "All") return projects;
    return projects.filter((p) => (p.technologies ?? p.tags ?? []).includes(activeTag));
  }, [projects, activeTag]);
  return (
    <div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTag(t)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              activeTag === t
                ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300"
                : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="group rounded-xl border border-purple-200 dark:border-purple-700 bg-white/70 dark:bg-purple-900/60 backdrop-blur-md overflow-hidden transition hover:shadow-xl hover:-translate-y-[2px]"
          >
            <div className="relative">
              {p.image && <img src={p.image} alt={p.title} className="h-36 w-full object-cover" />}
              {!p.image && p.images && p.images.length > 0 && <img src={p.images[0]} alt={p.title} className="h-36 w-full object-cover" />}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              </div>
              <div className="absolute top-3 right-3 text-[11px] px-2 py-1 rounded-full border border-purple-300 dark:border-purple-700 bg-white/70 dark:bg-purple-900/50">
                {(p.technologies ?? p.tags ?? []).slice(0, 1)[0] ?? "Project"}
              </div>
            </div>
            <div className="p-4">
              <p className="font-semibold">{p.title}</p>
              <p className="mt-1 text-xs text-purple-800 dark:text-purple-300 line-clamp-2">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(p.technologies ?? p.tags ?? []).slice(0, 4).map((t) => (
                  <span key={t} className="text-[11px] px-2 py-1 rounded-full border border-purple-300 dark:border-purple-700">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    setOpen(p);
                    setSelected(0);
                  }}
                  className="text-xs px-3 py-1 rounded-md border border-purple-500 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800 transition"
                >
                  View Details
                </button>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    className="text-xs px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(null)}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[560px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{open.title}</p>
              <button onClick={() => setOpen(null)} className="h-8 w-8 rounded-md border border-zinc-300 dark:border-zinc-700 grid place-items-center">
                <span className="block w-3 h-[2px] bg-zinc-900 dark:bg-zinc-200 rotate-45 translate-y-[1px]"></span>
                <span className="block w-3 h-[2px] bg-zinc-900 dark:bg-zinc-200 -rotate-45 -translate-y-[1px]"></span>
              </button>
            </div>
            {(() => {
              const gallery = Array.from(new Set([...(open.image ? [open.image] : []), ...((open.images ?? []) as string[])]));
              if (gallery.length > 0) {
                const current = gallery[Math.min(selected, gallery.length - 1)];
                return (
                  <>
                    <div className="mt-4 relative">
                      <img src={current} alt={open.title} className="h-44 w-full object-cover rounded-md border border-purple-300 dark:border-purple-700" />
                      <div className="absolute inset-0 rounded-md ring-1 ring-fuchsia-500/30 pointer-events-none"></div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {gallery.map((img, i) => (
                        <button key={img} onClick={() => setSelected(i)} className={`h-16 overflow-hidden rounded-md border transition ${i === selected ? "border-fuchsia-600" : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"}`}>
                          <img src={img} alt={open.title} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </>
                );
              }
              return null;
            })()}
            <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">{open.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(open.technologies ?? open.tags ?? []).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full border border-purple-300 dark:border-purple-700">{t}</span>
              ))}
            </div>
            {open.url && (
              <a href={open.url} target="_blank" className="mt-6 inline-block text-sm px-3 py-2 rounded-md border border-purple-500 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800 transition">
                Open Live Demo
              </a>
            )}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3">
                <p className="text-xs text-zinc-500">Images</p>
                <p className="text-sm font-medium">{(open.images?.length ?? 0) + (open.image ? 1 : 0)}</p>
              </div>
              <div className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3">
                <p className="text-xs text-zinc-500">Tags</p>
                <p className="text-sm font-medium">{(open.technologies ?? open.tags ?? []).length}</p>
              </div>
              <div className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3">
                <p className="text-xs text-zinc-500">Added</p>
                <p className="text-sm font-medium">{new Date(open.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
