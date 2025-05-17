import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  if(loading){return <div className="text-white px-4">Loading users...</div>;}
  if (!Array.isArray(allUsers)) {return <div className="text-red-500 px-4">Failed to load users</div>;}
  console.log("allUsers:", allUsers, "Type:", typeof allUsers);
  //console.log(allUsers);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.length === 0 ? (
          <div className="text-gray-400 px-4">No users found.</div>
        ) : (
          allUsers.map((user, index) => (
            <User key={user._id || index} user={user} />
         ))
       )}
      </div>
    </div>
  );
}

export default Users;
