import React from 'react';
import PropTypes from 'prop-types';

function Message({ username, content, type, color }) {

  const usernameColor = color ? {color: `${color}`} : '';

  // regex and function to detect image urls and change message 
  // if an image is found
  const regex = /https?:\/\/(~?\w+(-?\w*)+(\/|\.))+(png|jpg|gif)/gi;
  const handleImageURL = (message) => {
    let newHTML;
    const imageMatch = message.match(regex);
    if (imageMatch) {
    newHTML = message.replace(imageMatch[0], `<img src='${imageMatch[0]}' />`);
    } else {
      newHTML = message;
    }
    return `<div>${newHTML}</div>`;
  } 
  const displayContent = handleImageURL(content);

  const messageHTML =
    type === 'incomingMessage' ? (
      <div className='message'>
        <span className='message-username' style={usernameColor}>{username}</span>
        <span className='message-content' dangerouslySetInnerHTML={{__html: displayContent}}></span>
      </div>
    ) : (
      <div className='message system'>
        {content}
      </div>
    );
  return (
    <div>
    {messageHTML}
    </div>
  );
}

Message.propTypes = {
  color: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string
};

export default Message;
