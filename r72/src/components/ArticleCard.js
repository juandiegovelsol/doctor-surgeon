// src/components/ArticleCard.js
import React from "react";

const ArticleCard = ({ title, excerpt }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold text-scandi-dark-grey mb-2">{title}</h2>
      <p className="text-scandi-grey">{excerpt}</p>
      <button className="mt-4 bg-scandi-accent hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Read More
      </button>
    </div>
  );
};

export default ArticleCard;
