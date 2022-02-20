import React, { useState, useEffect } from "react";

import axiosBase from "../API/axiosBase";

const UsersPage = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axiosBase.get("/users");
        setUsers(result?.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setUsers(null);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ul>
      {loading ? (
        <h1>Loading</h1>
      ) : !users ? (
        <h1>No users found</h1>
      ) : (
        users.map((user) => {
          return <li key={user.id}>{user.id}</li>;
        })
      )}
    </ul>
  );
};

export default UsersPage;
