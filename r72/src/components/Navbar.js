// src/components/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-scandi-bg border-b border-scandi-light-grey sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-between w-full">
            <div className="flex">
              <div className="hidden md:flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-scandi-light-grey text-scandi-dark-grey"
                        : "text-scandi-grey hover:bg-scandi-light-grey hover:text-scandi-dark-grey"
                    }`
                  }
                  end // to match exact path for homepage
                >
                  Home
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-scandi-light-grey text-scandi-dark-grey"
                        : "text-scandi-grey hover:bg-scandi-light-grey hover:text-scandi-dark-grey"
                    }`
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-scandi-light-grey text-scandi-dark-grey"
                        : "text-scandi-grey hover:bg-scandi-light-grey hover:text-scandi-dark-grey"
                    }`
                  }
                >
                  Settings
                </NavLink>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-scandi-light-grey text-scandi-dark-grey"
                        : "text-scandi-grey hover:bg-scandi-light-grey hover:text-scandi-dark-grey"
                    }`
                  }
                >
                  Projects
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
