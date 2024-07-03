import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: number;
  username: string;
  date: string;
  active:boolean;
}

function User() {
  const [users, setUsers] = useState<IProps[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  console.log('data',users);

  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username}, <strong>Email:</strong> {user.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;