// src/components/ProfilePictureUpload.js
import React from "react";

const ProfilePictureUpload = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full h-24 w-24 bg-scandi-light-grey border-2 border-scandi-grey overflow-hidden flex items-center justify-center">
        {/* Placeholder for profile picture, replace with actual image handling later */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-scandi-grey"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.995 8.995 0 0112 21a8.995 8.995 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <button className="mt-2 px-4 py-2 bg-scandi-light-grey text-scandi-dark-grey rounded-md text-sm hover:bg-scandi-grey hover:text-white">
        Upload Picture
      </button>
    </div>
  );
};

export default ProfilePictureUpload;
