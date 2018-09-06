import React from 'react';
import PropTypes from 'prop-types';

function Message({ username, content, type, color }) {

  const usernameColor = color ? {color: `${color}`} : '';

  const regex = /https?:\/\/(~?\w+(-?\w*)+(\/|\.))+(png|jpg|gif)/gi;

  const handleImageURL = (message) => {
    let newHTML;
    const imageMatch = message.match(regex);
    console.log('This is imageMatch inside function:', imageMatch);
    if (imageMatch) {
    newHTML = message.replace(imageMatch[0], `<img src='${imageMatch[0]}' />`);
    } else {
      newHTML = message;
    }
    console.log('This is newHTML inside function:', newHTML);
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
  console.log(
    'This is username and content inside message:',
    username,
    content
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
