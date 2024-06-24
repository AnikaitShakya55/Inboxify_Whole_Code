import React, { useContext, useState } from 'react';
import { EditorState,  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './MailBoxPage.module.css'; // Import CSS module
import { AuthContext } from '../../Store/AuthContext';

const MailBox = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const authCtx = useContext(AuthContext)

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const message = contentState.getPlainText();

    const userEmail = authCtx.userEmail;
    const userName = userEmail && userEmail.split('@')[0];
  
    const fetchUrl = `https://mailbox-client-1927d-default-rtdb.firebaseio.com/emails/${userName}.json`;
    fetch(fetchUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ recipient, subject, message, sender: authCtx.userEmail, sentAt: new Date().toISOString() ,read : false ,id:Date.now() }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to store email');
        }
        console.log('Email stored successfully!');
        setRecipient('');
        setSubject('');
        setEditorState(EditorState.createEmpty());
      })
      .catch((error) => {
        console.error('Error storing email:', error);
      });
  };
  

  return (
    <div className={styles.container}>
      <div className={styles['form-box']}>
        <h2>Create Email</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="recipient">Recipient:</label>
            <input
              type="email"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:  </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <Editor
  editorState={editorState}
  onEditorStateChange={handleEditorStateChange}
  wrapperClassName={styles.editorWrapper}
  editorClassName={styles.editor}
  toolbar={{
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'embedded',
      'emoji',
      'image',
      'remove',
      'history',
    ],
  }}
/>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default MailBox;
