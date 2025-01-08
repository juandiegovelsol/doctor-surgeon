// src/components/InvitationList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvitations } from "../redux/reducers/invitationSlice";

const InvitationList = () => {
  const dispatch = useDispatch();
  const { invitations, loading, error } = useSelector(
    (state) => state.invitations
  );

  useEffect(() => {
    dispatch(fetchInvitations());
  }, [dispatch]);

  if (loading) {
    return <p>Loading invitations...</p>;
  }

  if (error) {
    return <p>Error loading invitations: {error}</p>;
  }

  return (
    <div className="form-container">
      <h3>List of Invitations</h3>
      {invitations.length === 0 ? (
        <p>No invitations found.</p>
      ) : (
        <div>
          {invitations.map((invitation) => (
            <div key={invitation.id} className="invitation-group">
              <h4>{invitation.invitationName}</h4>
              <p>
                <span className="info-header">Code:</span> {invitation.code}
              </p>
              <p>
                <span className="info-header">Guests:</span>{" "}
                {invitation.guestNames.join(", ")}
              </p>
              <p>
                <span className="info-header">Status:</span> {invitation.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvitationList;
