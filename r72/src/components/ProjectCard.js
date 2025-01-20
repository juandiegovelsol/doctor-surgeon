// src/components/ProjectCard.js
import React from "react";

const ProjectCard = ({ title, description, status }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold text-scandi-dark-grey mb-2">{title}</h2>
      <p className="text-scandi-grey mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-scandi-grey">
          Status: <span className="font-medium">{status}</span>
        </span>
        <button className="px-4 py-2 bg-scandi-accent hover:bg-green-600 text-white font-bold rounded focus:outline-none focus:shadow-outline">
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
