import React from "react";

const Sidebar = ({ users, onSelect, onlineUsers }) => {
  return (
    <div className="w-screen md:w-72 bg-gradient-to-b from-sky-700 to-sky-900 text-white h-screen flex flex-col">
      
      {/* Header */}
      <div className="p-4 text-lg font-semibold border-b border-sky-400 sticky top-0 bg-sky-800 z-10">
        Chats
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((u) => {
          const isOnline = onlineUsers?.has(u._id);

          return (
            <div
              key={u._id}
              onClick={() => onSelect(u)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-sky-800/60 cursor-pointer border-b border-sky-500/40"
            >
              {/* Avatar with status dot */}
              <div className="relative">
                <img
                  src={u.image}
                  alt={u.name}
                  className="w-11 h-11 rounded-full object-cover border border-white"
                />

                {/* Status dot */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-sky-900 ${
                    isOnline ? "bg-green-400" : "bg-gray-400"
                  }`}
                />
              </div>

              {/* Name + status text */}
              <div className="flex flex-col">
                <p className="font-medium text-sm">{u.name}</p>
                <p className="text-xs text-sky-200">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
