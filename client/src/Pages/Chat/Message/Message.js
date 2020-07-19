import React from 'react';

import './Message.css';

const Message = (props) => {
  return (
      props.message.sender === props.userID
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{props.message.data}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{props.message.data}</p>
            </div>
          </div>
        )
  );
}

export default Message;