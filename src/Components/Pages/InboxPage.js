import React, { useContext, useEffect, useState } from 'react';
import styles from './InboxPage.module.css';
import { AuthContext } from '../../Store/AuthContext';
import { useHistory } from 'react-router-dom';

const InboxPage = () => {
  const [unreadCounter, setUnreadCounter] = useState(0);
  const history = useHistory();
  const [receivedEmails, setReceivedEmails] = useState([]);
  const authCtx = useContext(AuthContext);
  const userEmail = authCtx.userEmail;
  const userName = userEmail && userEmail.split('@')[0];
  const url = `https://mailbox-client-1927d-default-rtdb.firebaseio.com/emails/${userName}.json`;

  useEffect(() => {
    fetchReceivedEmails();
    // const fetchInterval = setInterval(fetchReceivedEmails, 5000);
    // return () => clearInterval(fetchInterval);
  }, [userName]);


  const fetchReceivedEmails = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No Email Is Available');
        }
        return response.json();
      })
      .then((data) => {
        const emails = Object.values(data);
        setReceivedEmails(emails);
      })
      .catch((error) => {
        console.error("NO EMAIL IS AVAILABLE");
      });
  };
  
  const handleEmailClick = (emailId) => {
    const selectedEmail = receivedEmails.find((email) => email.id === emailId);
    if (selectedEmail) {
      markAsRead(emailId);
      history.push({
        pathname: `/inbox/${emailId}`,
        state: { email: selectedEmail },
      });
    }
  };

  const markAsRead = (emailId) => {
    const updatedEmails = receivedEmails.map((email) =>
      email.id === emailId ? { ...email, read: true } : email
    );
    setReceivedEmails(updatedEmails);

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(updatedEmails),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleDeleteEmail = (emailId) => {
    const updatedEmails = receivedEmails.filter((email) => email.id !== emailId);
    setReceivedEmails(updatedEmails);

    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete email');
        }
        console.log('Email deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting email:', error);
      });
  };

  useEffect(() => {
    const count = receivedEmails.filter((email) => !email.read).length;
    setUnreadCounter(count);
  }, [receivedEmails]);

  return (
    <div className={styles.container}>
      <h1 className={styles.headingh1}>Inbox ({unreadCounter})</h1>
      <div className={styles.emailList}>
        {receivedEmails.length === 0 && <p className={styles.emailListEmpty}>No emails found.</p>}
        {receivedEmails.map((email) => (
          <div key={email.id} className={`${styles.email} ${!email.read ? styles.unread : ''}`}>
            <div onClick={() => handleEmailClick(email.id)}>
              <p>To: {email.recipient}</p>
              <p>Subject: {email.subject}</p>
              {!email.read && <div className={styles.dot}></div>}
            </div>
            <button className="btn btn-danger" onClick={() => handleDeleteEmail(email.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
