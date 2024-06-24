import { useEffect, useState } from 'react';

const GetCustomHook = (url, userName) => {
  const [Emails, setEmails] = useState([]);

  useEffect(() => {
    getFetch();
  }, [url, userName]);


  const getFetch =()=>{
    fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }
      return response.json();
    })
    .then((data) => {
      const emailsData = Object.values(data);
      setEmails(emailsData);
    })
    .catch((error) => {
      console.error('Error fetching emails:', error);
    });

  }

  return { Emails ,setEmails,getFetch};
};

export default GetCustomHook;
