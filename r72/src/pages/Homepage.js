// src/pages/Homepage.js
import React from "react";
import ArticleCard from "../components/ArticleCard";

const Homepage = () => {
  const articles = [
    {
      id: 1,
      title: "Minimalist Design Trends",
      excerpt: "Explore the latest trends in minimalist web design...",
    },
    {
      id: 2,
      title: "The Art of Scandi Style",
      excerpt: "Learn about the core principles of Scandinavian design...",
    },
    {
      id: 3,
      title: "Creating Clean User Interfaces",
      excerpt: "Tips and tricks for developing user-friendly interfaces...",
    },
    // Add more article objects as needed
  ];

  return (
    <div className="bg-scandi-bg min-h-screen font-sans text-scandi-dark-grey">
      <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Homepage</h1>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            excerpt={article.excerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
