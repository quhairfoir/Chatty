import React from 'react';
import PropTypes from 'prop-types';

//helper function to create random IDs for new messages
function ID () {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function ChatBar ({currentUser, makeNewMessage}){

  const currentUsername = currentUser.name;

  const onKeyPress  = event => {
    if (event.key === 'Enter') {
      const newMessage = {
        id: ID(),
        content: event.target.value,
        username: currentUsername
      };
      makeNewMessage(newMessage)
    }
  }
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder={currentUser.name} />
      <input onKeyPress={onKeyPress}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
      />
    </footer>
  );
}
ChatBar.propTypes = {
  makeNewMessage:PropTypes.func,
  currentUser: PropTypes.object
};

export default ChatBar;