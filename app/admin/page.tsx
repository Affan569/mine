import { readJSON, Project, Message } from "@/lib/storage";

async function getProjects() {
  const data = readJSON<Project[]>("projects.json");
  return data;
}

async function getMessages() {
  const data = readJSON<Message[]>("messages.json");
  return data;
}
export default async function Admin() {
  const projects = await getProjects();
  const messages = await getMessages();
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Admin Panel</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form action="/api/projects" method="POST" encType="multipart/form-data" className="space-y-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-medium">Add Project</h2>
            <input name="title" placeholder="Title" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2" />
            <textarea name="description" placeholder="Description" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 h-24" />
            <input name="url" placeholder="Project URL" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2" />
            <input name="technologies" placeholder="Technologies (comma separated)" className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2" />
            <div className="space-y-2">
              <label className="block text-sm">Project Images (you can select multiple)</label>
              <input id="images" type="file" name="images" accept="image/*" multiple className="sr-only" />
              <label htmlFor="images" className="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <span>Select Project Images</span>
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Cover Image (optional)</label>
              <input id="image" type="file" name="image" accept="image/*" className="sr-only" />
              <label htmlFor="image" className="inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <span>Select Cover Image</span>
              </label>
            </div>
            <button className="h-10 w-full rounded-md bg-black text-white dark:bg-white dark:text-black">Create</button>
          </form>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-medium">Projects</h2>
            <ul className="mt-4 space-y-3">
              {projects.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
                  </div>
                  {p.image && <img src={p.image} alt="" className="h-12 w-12 rounded object-cover" />}
                  {!p.image && p.images?.[0] && <img src={p.images[0]} alt="" className="h-12 w-12 rounded object-cover" />}
                  <form action="/api/projects/delete" method="POST">
                    <input type="hidden" name="id" value={p.id} />
                    <button className="h-9 rounded-md px-3 bg-red-600 text-white hover:bg-red-700">Delete</button>
                  </form>
                </li>
              ))}
              {projects.length === 0 && <li className="text-sm text-zinc-600 dark:text-zinc-400">No projects yet</li>}
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <h2 className="text-xl font-medium">Messages</h2>
          <ul className="mt-4 space-y-3">
            {messages.map((m) => (
              <li key={m.id} className="rounded-md border border-zinc-200 dark:border-zinc-800 p-3">
                <p className="text-sm"><span className="font-medium">{m.name}</span> • {m.email}</p>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{m.message}</p>
                <p className="mt-1 text-xs text-zinc-500">{new Date(m.createdAt).toLocaleString()}</p>
              </li>
            ))}
            {messages.length === 0 && <li className="text-sm text-zinc-600 dark:text-zinc-400">No messages yet</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
