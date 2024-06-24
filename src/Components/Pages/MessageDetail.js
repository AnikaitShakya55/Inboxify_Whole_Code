import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MessageDetail.module.css';

const MessageDetail = () => {
  const location = useLocation();
  const { email } = location.state;

  if (!email) {
    return <div>Loading...</div>;
  }


  return (
    
    <div className={styles.messageDetailContainer}>
      <div className={styles.messageDetail}>
        <h2 className={styles.messageDetailHeader}>Message Detail</h2>
        <div className={styles.messageDetailItem}>
          <p>From: {email.sender}</p>
          <p>To: {email.recipient}</p>
          <p>Subject: {email.subject}</p>
          <p>Message: {email.message}</p>
          <p>Sent At: {new Date(email.sentAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
