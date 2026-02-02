import { readJSON, Project } from "@/lib/storage";
import ProjectsGrid from "./ProjectsGrid";

async function getProjects() {
  const data = readJSON<Project[]>("projects.json");
  return data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Projects</h1>
        
          <ProjectsGrid projects={projects} />
        </div>
      </div>
  );
}
