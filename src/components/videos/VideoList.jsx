import React, { useState, useEffect } from 'react';
import { videoAPI } from '../../services/api';
import { consumer } from '../../services/cable';
import { Link } from 'react-router-dom';
import Video from './Video';

const VideoList = ({currentUser}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await videoAPI.getVideos();
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const subscription = consumer.subscriptions.create("VideoNotificationsChannel", {
      received(data) {
        if (data.type === 'new_video') {
          setVideos(prevVideos => {
            const updatedVideos = [data.video, ...prevVideos];
            return updatedVideos.slice(0, 10);
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Explore Community Favorites</h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Discover the best videos shared by our awesome community!</p>
      </div>
    </div>

    { videos.length === 0 ?
      (
        <div className="bg-white p-6 rounded-lg shadow-md text-center mt-4">
          <h3 className="text-lg font-medium text-gray-900">No videos shared yet</h3>
          <p className="mt-2 text-sm text-gray-500">Be the first to share an interesting YouTube video!</p>
          {
            currentUser ? (
              <div className="mt-4">
                <Link to="/videos/new" className="custom-btn submit-btn">Share a video</Link>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">Please log in to share videos</p>
            )}
        </div>
      ): (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </div>
      )}
    </>
  );
};

export default VideoList;
