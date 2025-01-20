// src/pages/ProjectsPage.js
import React from "react";
import ProjectCard from "../components/ProjectCard";

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Redesigning the company website for a modern look.",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Developing a new mobile application for iOS and Android.",
      status: "Planning",
    },
    {
      id: 3,
      title: "Marketing Campaign",
      description: "Launching a new marketing campaign for the summer season.",
      status: "Completed",
    },
    // Add more project objects as needed
  ];

  return (
    <div className="bg-scandi-bg min-h-screen font-sans text-scandi-dark-grey">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button className="px-4 py-2 bg-scandi-accent hover:bg-green-600 text-white font-bold rounded focus:outline-none focus:shadow-outline">
            Create New Project
          </button>
        </div>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
