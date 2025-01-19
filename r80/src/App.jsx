import React, { useState } from "react";
import ThemeContext from "./ThemeContext";
import MyComponent from "./MyComponent";
import AnotherComponent from "./AnotherComponent";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <MyComponent />
        <AnotherComponent />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
