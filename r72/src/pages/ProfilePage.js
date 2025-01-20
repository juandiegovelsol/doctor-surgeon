// src/pages/ProfilePage.js
import React from "react";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

const ProfilePage = () => {
  return (
    <div className="bg-scandi-bg min-h-screen font-sans text-scandi-dark-grey">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        <div className="flex justify-center mb-8">
          <ProfilePictureUpload />
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-scandi-grey"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="name"
                className="shadow-sm focus:ring-scandi-accent focus:border-scandi-accent block w-full sm:text-sm border-scandi-light-grey rounded-md bg-scandi-bg text-scandi-dark-grey"
                placeholder="Your Name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-scandi-grey"
            >
              Interests
            </label>
            <div className="mt-1">
              <textarea
                id="interests"
                rows="3"
                className="shadow-sm focus:ring-scandi-accent focus:border-scandi-accent block w-full sm:text-sm border-scandi-light-grey rounded-md bg-scandi-bg text-scandi-dark-grey"
                placeholder="Your Interests"
              ></textarea>
            </div>
          </div>
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-scandi-grey"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                rows="5"
                className="shadow-sm focus:ring-scandi-accent focus:border-scandi-accent block w-full sm:text-sm border-scandi-light-grey rounded-md bg-scandi-bg text-scandi-dark-grey"
                placeholder="About Yourself"
              ></textarea>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-scandi-accent hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scandi-accent"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
