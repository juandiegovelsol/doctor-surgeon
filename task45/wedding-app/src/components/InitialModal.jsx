// src/components/InitialModal.jsx
import React from "react";
import { useDispatch } from "react-redux";
import {
  setAdminMode,
  fetchInvitations,
} from "../redux/reducers/invitationSlice";

const InitialModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    const adminCode = event.target.adminCode.value;
    if (adminCode === "admin123") {
      dispatch(setAdminMode(true));
      dispatch(fetchInvitations());
      onClose();
    } else {
      alert("Incorrect admin code.");
    }
  };

  const handleGuestContinue = () => {
    dispatch(setAdminMode(false));
    dispatch(fetchInvitations()); // Fetch invitation names for guest form
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome</h2>
        <form onSubmit={handleAdminSubmit}>
          <div>
            <label htmlFor="adminCode">Enter Admin Code:</label>
            <input type="password" id="adminCode" name="adminCode" />
          </div>
          <button type="submit">Submit Admin Code</button>
        </form>
        <button onClick={handleGuestContinue}>Continue as Guest</button>
      </div>
    </div>
  );
};

export default InitialModal;
