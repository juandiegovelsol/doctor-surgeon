// AnotherComponent.js (using hooks)
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserSession } from "./actions/userActions";

const AnotherComponent = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulate login
    dispatch(setUserSession({ id: 1, name: "John Doe" }));
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AnotherComponent;
