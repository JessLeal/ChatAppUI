import React, { useState, useEffect } from "react";

import axiosBase from "../API/axiosBase";

const UsersPage = () => {
  const [users, setUsers] = useState(["array"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await axiosBase.get("/users");
      setUsers(result.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <ul>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        users.map((user) => {
          return <li key={user.id}>{user.id}</li>;
        })
      )}
    </ul>
  );
};

export default UsersPage;
