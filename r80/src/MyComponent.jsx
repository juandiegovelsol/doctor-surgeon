// MyComponent.js (using connect)
import React from "react";
import { connect } from "react-redux";
import { toggleTheme } from "./actions/themeActions";

const MyComponent = ({ theme, toggleTheme }) => {
  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#333" }}>
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = {
  toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
