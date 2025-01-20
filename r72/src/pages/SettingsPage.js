// src/pages/SettingsPage.js
import React from "react";

const SettingsPage = () => {
  const settings = [
    {
      id: 1,
      name: "Notifications",
      description: "Manage your notification preferences.",
    },
    { id: 2, name: "Privacy", description: "Control your privacy settings." },
    { id: 3, name: "Account", description: "Update your account information." },
    {
      id: 4,
      name: "Appearance",
      description: "Customize the look of your website.",
    },
    // Add more settings as needed
  ];

  return (
    <div className="bg-scandi-bg min-h-screen font-sans text-scandi-dark-grey">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="divide-y divide-scandi-light-grey">
          {settings.map((setting) => (
            <div key={setting.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{setting.name}</h3>
                  <p className="text-sm text-scandi-grey">
                    {setting.description}
                  </p>
                </div>
                <button className="ml-4 px-3 py-2 bg-scandi-light-grey text-scandi-dark-grey rounded-md text-sm hover:bg-scandi-grey hover:text-white">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
