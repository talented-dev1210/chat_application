import { useState } from 'react';
import { ChatEngine, getMessages } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import './App.css';

const projectID = '1b7801d6-8a66-4be4-a442-89219d833dfc';
const chatID = 165;

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [password, setPassword] = useState(localStorage.getItem('password'));

  if (!username || !password) {
    setUsername(prompt('Enter your username:'));
    setPassword(prompt('Enter your password:'));

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    getMessages({ projectID, 'User-Name': username, 'User-Secret': password }, chatID, (chatID, data) => {
      console.log(chatID, data);
    });

    return 'Loading';
  }

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={username}
      userSecret={password}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} x={console.log(chatAppProps)} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default App;
