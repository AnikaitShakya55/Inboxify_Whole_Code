import React, { useContext, useState } from 'react';
import styles from './Profile.module.css'; 
import profilepic from '../../Assests/profile-background-iconpng.png'
import UserPic from '../../Assests/manProfile.png';
import { AuthContext } from '../../Store/AuthContext';

const Profile = () => {
  const authCtx = useContext(AuthContext)
  const userEmail = localStorage.getItem("email")
  const userName =  userEmail && userEmail.split('@')[0]

  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const logoutHandler =()=>{
    alert("Email is Logged Out")
    authCtx.logout()
  }

  return (
    <div className={styles.profile}>

      <div className={styles.profileIcon} onClick={toggleProfile}>
        <img src={profilepic} alt="Profile"  className={styles.profileIconImage} />
      </div>


      {showProfile && (
       <div className={styles.profileBox}>
       <h3>Profile Information</h3>
       <img src={UserPic} alt="Profile" className={styles.profilePic} />
       <p><strong>Username: {userName}  </strong> </p>
       <p><strong>Email:</strong> {userEmail}</p>
       <button onClick={logoutHandler} > Logout</button>
     </div>

      )}
    </div>
  );
};

export default Profile;
