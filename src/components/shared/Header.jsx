import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { HomeIcon } from '../Icons';

const Header = ({ currentUser, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authAPI.login({ email, password });
      setCurrentUser(response.data.user);

      if (response.data.user && response.data.user.id) {
        localStorage.setItem('userId', response.data.user.id.toString());
      }

      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setCurrentUser(null);

      localStorage.removeItem('userId');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center font-bold text-xl text-indigo-600">
              <HomeIcon/>
              <span className="ml-2">Video Sharing Platform</span>
            </Link>
          </div>

          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/videos/new"
                  className="custom-btn submit-btn"
                >
                  Share Video
                </Link>
                <button
                  onClick={handleLogout}
                  className="custom-btn logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 items-end">
                <form onSubmit={handleSubmit} className="flex items-end space-x-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="custom-input"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="custom-input"
                    required
                  />
                  <button type="submit" className="custom-btn submit-btn"
                  >
                    Login / Register
                  </button>
                </form>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
