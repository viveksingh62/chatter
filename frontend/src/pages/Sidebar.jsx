import React from "react";

const Sidebar = ({ users, onSelect }) => {
  return (
    <div style={{ width: "200px" }}>
      {users.map((u) => (
        <div
          key={u._id}
          onClick={() => {
            console.log("Clicked user:", u);
            onSelect(u);
          }}
          style={{ cursor: "pointer" }}
        >
          {u.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
