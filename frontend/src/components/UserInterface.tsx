import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInterfaceProps {
  backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [updateUser, setUpdateUser] = useState({ id: '', name: '', email: '' });

  const isGo = backendName === 'go';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [apiUrl, backendName]);

  const addUser = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/${backendName}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUserDetails = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/${backendName}/users/${updateUser.id}`,
        { name: updateUser.name, email: updateUser.email }
      );
      setUsers(users.map(user => (user.id === response.data.id ? response.data : user)));
      setUpdateUser({ id: '', name: '', email: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/api/${backendName}/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={`p-6 rounded-2xl ${isGo ? 'bg-gray-100' : 'bg-gray-200'} text-gray-800`}>
      <h1 className="text-3xl font-bold mb-6 text-center">User Interface</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {users.map(user => (
          <div key={user.id} className="relative">
            <CardComponent card={user} />
            <button
              onClick={() => deleteUser(user.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">➕ Add User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="input mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="input mb-4 w-full"
          />
          <button
            onClick={addUser}
            className="btn-primary w-full"
          >
            Add User
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">✏️ Update User</h2>
          <input
            type="text"
            placeholder="ID"
            value={updateUser.id}
            onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
            className="input mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Name"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
            className="input mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={updateUser.email}
            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
            className="input mb-4 w-full"
          />
          <button
            onClick={updateUserDetails}
            className="btn-primary w-full"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInterface;
