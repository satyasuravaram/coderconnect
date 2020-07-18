import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = () => {
  let isSentByCurrentUser = false;


  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{}</p>
            </div>
            <p className="sentText pl-10 ">{}</p>
          </div>
        )
  );
}

export default Message;