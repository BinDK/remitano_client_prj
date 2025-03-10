import React, { useState, useEffect } from 'react';
import { consumer } from '../../services/cable';
import { XMark } from '../Icons';

const VideoNotification = () => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const subscription = consumer.subscriptions.create("VideoNotificationsChannel", {
      received(data) {
        const currentUserId = localStorage.getItem('userId');

        if (data.type === 'new_video' && (!currentUserId || currentUserId !== data.current_user_id.toString())) {
          setNotification({
            title: data.video.title,
            user: data.video.user.email
          });
          setIsError(false);
          setIsVisible(true);

          setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        }
        else if (data.type === 'error' && data.client_type === 'api') {
          setNotification({
            error: data.error
          });
          setIsError(true);
          setIsVisible(true);

          setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isVisible || !notification) return null;

  return (
    <div className={`fixed top-100 right-4 max-w-xs bg-white border-l-4 ${isError ? 'border-red-500' : 'border-blue-500'} text-sm text-gray-800 rounded-md shadow-md`}>
      <div id={isError ? "hs-toast-soft-color-red-label" : "hs-toast-soft-color-blue-label"} className="flex p-4">
        <div className="flex-1">
          {isError ? (
            <>
              <p className="font-medium text-red-600">Error processing video</p>
              <p className="mt-1 text-gray-600">
                {notification.error}
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-blue-600">New video shared!</p>
              <p className="mt-1 text-gray-600">
                {notification.user} shared a video "{notification.title}"
              </p>
            </>
          )}
        </div>

        <div className="ms-auto">
          <button
            type="button"
            className={`inline-flex items-center justify-center size-5 rounded-lg ${isError ? 'text-red-500' : 'text-blue-500'} opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-${isError ? 'red' : 'blue'}-500`}
            aria-label="Close"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Close</span>
            <XMark/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoNotification;
