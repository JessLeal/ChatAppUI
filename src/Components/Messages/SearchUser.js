import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosBase from '../../API/axiosBase';

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    console.log(e.target.value);
    if (!e.target.value) return setUsers([]);

    try {
      const res = await axiosBase.get(`/users?searchQuery=${e.target.value}`);

      if (res) {
        return setUsers(res?.data);
      }
      return setUsers([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = ({ userName, knownAs }) => {
    navigate(`/messages/${userName}?messageKnownAs=${knownAs}`);
  };

  return (
    <div className='search-user-container'>
      <div className='users-search-input-container'>
        <div>To: </div>
        <input
          type='text'
          placeholder='Search User'
          onChange={handleSearch}
          className='users-search-input'
        />
      </div>
      <div className='users-list-container'>
        {users.length !== 0 &&
          users.map((u) => {
            return (
              <div key={u.userName} className='user-item' onClick={() => handleClick(u)}>
                <div className='avatar'></div>
                <div className='users-username'>{u.knownAs}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchUser;
