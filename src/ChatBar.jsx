import React from 'react';
import PropTypes from 'prop-types';


function ChatBar ({currentUser, makeNewMessage, setUsername}){
  console.log(currentUser);

  const currentUsername = currentUser.name || 'Your username here...'

  const onBlur = event => {
    const name = event.target.value;
    setUsername(name);
  }

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      const content = event.target.value;
      makeNewMessage(content, 'postMessage');
      event.target.value = '';
    }
  }

  return (
    <footer className='chatbar'>
      <input onBlur={onBlur}
        // onChange={onChange} 
        className='chatbar-username' 
        placeholder={currentUsername} 
        />
      <input onKeyPress={onKeyPress}
        className='chatbar-message'
        placeholder='Type a message and hit ENTER'
      />
    </footer>
  );
}
ChatBar.propTypes = {
  // alertNameChange: PropTypes.func,
  setUsername: PropTypes.func,
  makeNewMessage: PropTypes.func,
  currentUser: PropTypes.object
};

export default ChatBar;