import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authService } from '../../../services/AuthService';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await authService.register(name, email, password);

    if (response.data) {
      navigate('/backoffice')
    } else {
      alert(response.error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
            Register for an account
          </h2>
        </div>
        <form className="mt-8 flex flex-col bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
          <div className="text-xs text-gray-500 mb-1">Name</div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
            className="rounded border border-gray-100 p-2 bg-gray-50 mb-4"
          />
          <div className="text-xs text-gray-500 mb-1">Email</div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="rounded border border-gray-100 p-2 bg-gray-50 mb-4"
          />
          <div className="text-xs text-gray-500 mb-1">Password</div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="rounded border border-gray-100 p-2 bg-gray-50 mb-4"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mt-4 rounded">
            Register
          </button>
          <div className="flex justify-center mt-4 mb-2">
            <Link to="/backoffice" className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;