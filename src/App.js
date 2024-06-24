import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthPage from './Components/Pages/AuthPage';
import MailBoxPage from './Components/Pages/MailBoxPage';
import { AuthContext } from './Store/AuthContext';
import InboxPage from './Components/Pages/InboxPage';
import SideBar from './Components/Layout/SideBar';
import MessageDetail from './Components/Pages/MessageDetail';
import SentMail from './Components/Pages/SentMail';
import Profile from './Components/Layout/Profile';

const App = () => {
  const authCtx = useContext(AuthContext); //camel

  return (
    <div>
      <aside>
        <SideBar />
        <Profile/>
      </aside>
      <main>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>
        <Route path='/auth'>
          {!authCtx.isLoggedIn && <AuthPage />}
          {authCtx.isLoggedIn && <Redirect to='/mailbox' />}
        </Route>
        <Route path='/mailbox'>
          {authCtx.isLoggedIn ? <MailBoxPage /> : <Redirect to='/auth' />}
        </Route>

        <Route path='/inbox' exact>
          {authCtx.isLoggedIn ? <InboxPage /> : <Redirect to='/auth' />}
        </Route>

        <Route path='/inbox/:id' exact>
        {authCtx.isLoggedIn ? <MessageDetail /> : <Redirect to='/auth' /> }
        </Route>
      
       <Route path='/sent' exact>
       {authCtx.isLoggedIn ? <SentMail/> : <Redirect to='/auth' />}
       </Route>

       <Route path='/sent/:id' exact>
        {authCtx.isLoggedIn ? <SentMail /> : <Redirect to='/auth' /> }
        </Route>

      </main>
    </div>
  );
};

export default App;
