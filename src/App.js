import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/shared/Header';
import VideoNotification from './components/shared/VideoNotification';
import VideoList from './components/videos/VideoList';
import VideoForm from './components/videos/VideoForm';
import { authAPI } from './services/api';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setCurrentUser(response.data.user);

        if (response.data.user && response.data.user.id) {
          localStorage.setItem('userId', response.data.user.id.toString());
        } else {
          localStorage.removeItem('userId');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('userId');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VideoNotification />
          <Routes>
            <Route path="/" element={<VideoList currentUser={currentUser} />} />
            <Route path="/videos" element={<VideoList currentUser={currentUser} />} />
            <Route path="/videos/new" element={
              currentUser ? <VideoForm /> : <Navigate to="/" />
            } />
          </Routes>
        </main>
    </Router>
  );
}

export default App;
