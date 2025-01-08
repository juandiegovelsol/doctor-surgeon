// src/components/AdminDashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateInvitationForm from "./CreateInvitationForm";
import InvitationList from "./InvitationList";
import {
  fetchInvitations,
  fetchWeddingSummary,
} from "../redux/reducers/invitationSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { summary, loadingSummary, errorSummary } = useSelector(
    (state) => state.invitations
  );

  const handleRefreshInvitations = () => {
    dispatch(fetchInvitations());
  };

  const handleGetSummary = () => {
    dispatch(fetchWeddingSummary());
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {loadingSummary && <p>Loading summary...</p>}
      {errorSummary && <p>Error loading summary: {errorSummary}</p>}
      {summary && (
        <div className="summary-container">
          <h3>Wedding Summary</h3>
          <p>
            <span className="info-header">Total Invited Guests:</span>{" "}
            {summary.totalInvitedGuests}
          </p>
          <p>
            <span className="info-header">Accepted Guests:</span>{" "}
            {summary.acceptedGuestsCount}
          </p>
          <p>
            <span className="info-header">Accepted Adults:</span>{" "}
            {summary.acceptedAdultsCount}
          </p>
          <p>
            <span className="info-header">Accepted Children:</span>{" "}
            {summary.acceptedChildrenCount}
          </p>
          <p>
            <span className="info-header">Pending Guests:</span>{" "}
            {summary.pendingGuestNames.length}
          </p>
          <p>
            <span className="info-header">Rejected Guests:</span>{" "}
            {summary.rejectedGuestNames.length}
          </p>
        </div>
      )}
      <button onClick={handleGetSummary}>Get Wedding Summary</button>

      <InvitationList />
      <button onClick={handleRefreshInvitations}>Update Invitation List</button>
      <CreateInvitationForm />
    </div>
  );
};

export default AdminDashboard;
