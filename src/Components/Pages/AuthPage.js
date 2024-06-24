import React, { useState, useRef, useContext } from 'react';
import classes from './AuthPage.module.css';
import { useHistory } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { AuthContext } from '../../Store/AuthContext';

const AuthPage = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [loader, setLoader] = useState(false);
  const [formError, setFormError] = useState('');

  const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };



  
  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    //in signup case : check the password 
    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword.trim() !== enteredConfirmPassword.trim()) {
        setFormError("Passwords don't match.");
        return;
      }
    }
    
    //Empty field : - 
    if (enteredEmail.trim() === '' || enteredPassword.trim() === '') {
      setFormError('Please fill in all fields.');
      return;
    }

    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCt74W1LpXT_0cx9X1rcrObLM-ggCMsfGA';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt74W1LpXT_0cx9X1rcrObLM-ggCMsfGA';
    }
    setLoader(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword, returnSecureToken: true }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.ok) {
          setLoader(false);
          return res.json();
        } else {
          setLoader(false);
          return res.json().then(data => {
            let errorMessage = 'Authentication Failed';
            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        authCtx.login(data.idToken,data.email)
        console.log(data);
        history.replace('/mailbox');
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div className={classes.auth}>
      <div className={classes.overlay}></div>
      <div className={classes.form}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email"><AiOutlineMail /> Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password"><AiOutlineLock /> Your Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirmPassword"><AiOutlineLock /> Confirm Password</label>
              <input type="password" id="confirmPassword" required ref={confirmPasswordInputRef} />
            </div>
          )}
          {formError && <p className={classes.error}>{formError}</p>}
          <div className={classes.actions}>
            <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
            {!loader && <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>}
            {loader && <button disabled>Loading...</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
