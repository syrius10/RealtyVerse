import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/personalization/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.post('/api/personalization/notifications/read', { notificationId });
      setNotifications(notifications.map(notif => notif._id === notificationId ? { ...notif, read: true } : notif));
    } catch (err) {
      console.error(err);
      alert('Error marking notification as read');
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <p>{notification.message}</p>
              <button onClick={() => handleMarkAsRead(notification._id)} disabled={notification.read}>
                {notification.read ? 'Read' : 'Mark as Read'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default Notifications;