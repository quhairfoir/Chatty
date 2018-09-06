import React from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';


function MessageList ({messages}) {
  console.log(messages)
  const allMessages = messages.map( message =>
    <Message key={message.id} 
    username={message.username} 
    content={message.content}
    type={message.type} 
    color={message.color}
    />
  )
  return (
    <main className="messages">
    {allMessages}
    <div id="bottom"></div>
    </main>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array
};

export default MessageList;
