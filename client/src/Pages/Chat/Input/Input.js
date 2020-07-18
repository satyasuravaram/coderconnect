import React from 'react';

import './Input.css';

const Input = () => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
    />
    <button className="sendButton">Send</button>
  </form>
)

export default Input;