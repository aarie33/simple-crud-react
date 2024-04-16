import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/AuthService';
import { useDispatch } from 'react-redux';
import { Spinner } from 'flowbite-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true)

    const response = await authService.login(username, password);

    if (response.data) {
      dispatch({ type: 'LOGIN', payload: response.data });

      setLoading(false);
      navigate('/backoffice/dashboard')
    } else {
      alert(response.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 flex flex-col bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="text-xs text-gray-500 mb-1">Email</div>
          <input
            type="email"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
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

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center py-2 px-4 my-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading && <Spinner aria-label="Login" size="sm" className="me-2" />}
              Sign in
            </button>
          </div>

          <div className="flex justify-center my-2">
            <Link to="/backoffice/registration" className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
              Register
            </Link>
          </div>

          <div className="flex justify-center py-1">
            <Link to="/" className="text-indigo-500 hover:text-indigo-600 cursor-pointer">
              Landing page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;