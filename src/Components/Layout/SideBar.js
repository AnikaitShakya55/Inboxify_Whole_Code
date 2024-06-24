import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css'; // Import CSS module

const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/mailbox">Compose Email</Link>
        </li>
        <li>
          <Link to="/inbox">Inbox</Link>
        </li>
        <li>
          <Link to="/sent">Sent</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
