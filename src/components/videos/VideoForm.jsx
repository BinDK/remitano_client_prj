import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { videoAPI } from '../../services/api';
import { XMark } from '../Icons';

const VideoForm = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a valid YouTube video URL');
      return;
    }

    try {
      await videoAPI.shareVideo(url);

      setUrl('');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to share video');
    }
  };

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Share Your Favorite YouTube Video</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Got a video you love? Share it with the world!</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg  mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
        { error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <XMark/>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-700">There were some issues with your submission:</h3>
              <div className="mt-2 list-disc list-inside text-sm text-red-700">
                <span>{error}</span>
              </div>
            </div>
          </div>
          </div>
        )}

          <div className="mt-1">
            <label htmlFor="video-url" className="block text-gray-700 font-medium mb-2">
              YouTube Video URL
            </label>
            <input
              type="text"
              id="video-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p class="mt-2 text-sm text-gray-500">
              Enter a valid YouTube URL (youtube.com, youtu.be, or youtube.com/shorts)
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Link to="/" className="custom-btn logout-btn font-bold">
              Cancel
            </Link>
            <button
              type="submit"
              className="custom-btn submit-btn font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VideoForm;
