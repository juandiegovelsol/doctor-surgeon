// src/components/CreateInvitationForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createInvitation } from "../redux/reducers/invitationSlice";

const CreateInvitationForm = () => {
  const dispatch = useDispatch();
  const [invitationName, setInvitationName] = useState("");
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childrenQuantity, setChildrenQuantity] = useState(0);
  const [guestNames, setGuestNames] = useState([""]);
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guestNames.length !== adultQuantity + childrenQuantity) {
      alert(
        "Number of guest names must match the total quantity of adults and children."
      );
      return;
    }
    dispatch(
      createInvitation({
        invitationName,
        adultQuantity: parseInt(adultQuantity),
        childrenQuantity: parseInt(childrenQuantity),
        guestNames,
        status: "pending",
        code,
        phoneNumber,
      })
    );
    // Reset form after submission
    setInvitationName("");
    setAdultQuantity(1);
    setChildrenQuantity(0);
    setGuestNames([""]);
    setCode("");
    setPhoneNumber("");
  };

  const handleGuestNameChange = (index, value) => {
    const newGuestNames = [...guestNames];
    newGuestNames[index] = value;
    setGuestNames(newGuestNames);
  };

  const addGuestField = () => {
    setGuestNames([...guestNames, ""]);
  };

  return (
    <div className="form-container">
      <h3>Create New Invitation</h3>
      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label htmlFor="invitationName">
            <span className="info-header">Invitation Name:</span>
          </label>
        </div>
        <div>
          <input
            type="text"
            id="invitationName"
            value={invitationName}
            onChange={(e) => setInvitationName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="adultQuantity">
            <span className="info-header">Adults:</span>
          </label>
        </div>
        <div>
          <input
            type="number"
            id="adultQuantity"
            value={adultQuantity}
            onChange={(e) => setAdultQuantity(parseInt(e.target.value) || 0)}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="childrenQuantity">
            <span className="info-header">Children:</span>
          </label>
        </div>
        <div>
          <input
            type="number"
            id="childrenQuantity"
            value={childrenQuantity}
            onChange={(e) => setChildrenQuantity(parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>
        <div>
          <label>
            <span className="info-header">Guest Names:</span>
          </label>
        </div>
        <div>
          {guestNames.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              onChange={(e) => handleGuestNameChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addGuestField}>
            Add Guest
          </button>
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
          <label htmlFor="phoneNumber">
            <span className="info-header">Phone Number:</span>
          </label>
        </div>
        <div>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Invitation</button>
      </form>
    </div>
  );
};

export default CreateInvitationForm;
