// src/components/GuestConfirmationForm.jsx;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInvitationStatus } from "../redux/reducers/invitationSlice";

const GuestConfirmationForm = () => {
  const dispatch = useDispatch();
  const { availableInvitationNames, loading } = useSelector(
    (state) => state.invitations
  );
  const [invitationName, setInvitationName] = useState("");
  const [code, setCode] = useState("");
  const [isAccepted, setIsAccepted] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInvitationStatus({ code, invitationName, isAccepted }));
    // Reset form after submission
    setInvitationName("");
    setCode("");
    setIsAccepted(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-container guest-confirmation-form">
      <h2>Confirm Invitation Status</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label htmlFor="invitationName">
            <span className="info-header">Invitation Name:</span>
          </label>
        </div>
        <div>
          <select
            id="invitationName"
            value={invitationName}
            onChange={(e) => setInvitationName(e.target.value)}
            required
          >
            <option value="">Select Invitation Name</option>
            {availableInvitationNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="code">
            <span className="info-header">Code:</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <span className="info-header">Confirmation:</span>
          </label>
        </div>
        <div>
          <select
            value={isAccepted}
            onChange={(e) => setIsAccepted(e.target.value === "true")}
          >
            <option value={true}>Confirm</option>
            <option value={false}>Reject</option>
          </select>
        </div>
        <button type="submit">Submit Confirmation</button>
      </form>
    </div>
  );
};

export default GuestConfirmationForm;
