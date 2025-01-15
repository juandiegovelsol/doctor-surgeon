// App.js
import React from "react";
import AlternatingWelcomeMessage from "./AlternatingWelcomeMessage";
import "./App.css";

function App() {
  const personGroups = ["men", "women", "kids", "seniors", "everyone"];
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
