import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <svg className="h-6 w-6 fill-current text-gray-700" viewBox="0 0 24 24">
          {/* Hamburger Icon (replace with your icon) */}
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 19a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-200 z-40 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          <h2 className="font-bold text-lg mb-4">Dashboard Menu</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Orders
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Inventory
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
