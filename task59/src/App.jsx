// Example Usage in App.js or any component where you want to use it
import React from "react";
import AlternatingWelcomeMessage from "./AlternatingWelcomeMessage";
import "./App.css"; // Optional: for global styles

function App() {
  const personGroups = [
    "men",
    "women",
    "kids",
    "seniors",
    "everyone",
    "others",
  ];
  const welcomeBase = "We are happy to have you here";

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Website!</h1>
        <AlternatingWelcomeMessage
          baseMessage={welcomeBase}
          names={personGroups}
        />
      </header>
    </div>
  );
}

export default App;
