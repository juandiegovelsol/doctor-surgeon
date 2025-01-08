// src/App.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InitialModal from "./components/InitialModal";
import AdminDashboard from "./components/AdminDashboard";
import GuestConfirmationForm from "./components/GuestConfirmationForm";
import "./index.css"; // Import the main CSS file

function App() {
  const isAdmin = useSelector((state) => state.invitations.isAdmin);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {isModalVisible && <InitialModal onClose={closeModal} />}
      {isAdmin && <AdminDashboard />}
      {!isAdmin && !isModalVisible && <GuestConfirmationForm />}
    </div>
  );
}

export default App;
