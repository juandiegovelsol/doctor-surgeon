// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import IndividualResourcePage from "./components/IndividualResourcePage";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:resourceName" element={<IndividualResourcePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
