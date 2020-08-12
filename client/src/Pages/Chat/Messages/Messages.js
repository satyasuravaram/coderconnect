import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';

import './Messages.css';

const Messages = (props) => (
  <ScrollToBottom className="messages-scroll-session">
    {props.messages.map((message, i) => <Message message={message} userID={props.userID}/>) }
  </ScrollToBottom>
);

export default Messages;