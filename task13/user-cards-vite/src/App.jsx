import React from "react";

const UserCard = ({ user }) => {
  const cardStyle = {
    border: "5px solid #e0e0e0",
    borderRadius: "15px",
    padding: "20px",
    width: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  };

  const imageContainerStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const nameStyle = {
    fontWeight: "bold",
    fontSize: "1.2em",
    marginBottom: "5px",
    textTransform: "uppercase",
    textAlign: "center",
  };

  const emailStyle = {
    fontSize: "0.9em",
    color: "#888",
    marginBottom: "10px",
    textAlign: "center",
  };

  const statusStyle = {
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "5px",
    textAlign: "center",
    color: "white",
    backgroundColor: user.isActive ? "green" : "red",
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={user.imageUrl} alt={user.name} style={imageStyle} />
      </div>
      <div style={nameStyle}>{user.name}</div>
      <div style={emailStyle}>{user.email}</div>
      <div style={statusStyle}>{user.isActive ? "Active" : "Inactive"}</div>
    </div>
  );
};

const App = () => {
  const users = [
    {
      id: 1,
      name: "JOHN DOE",
      email: "john.doe@example.com",
      imageUrl:
        "https://einnova.com/wp-content/uploads/2013/11/Internet1-640x515.jpg",
      isActive: true,
    },
    {
      id: 2,
      name: "JANE SMITH",
      email: "jane.smith@example.com",
      imageUrl: "https://via.placeholder.com/100",
      isActive: false,
    },
    {
      id: 3,
      name: "PETerrr JONES",
      email: "peter.jones@example.com",
      imageUrl: "https://via.placeholder.com/100",
      isActive: true,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default App;
