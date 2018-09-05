import React from 'react';
import PropTypes from 'prop-types';

function Message({ username, content, type }) {
  const messageHTML =
    type === 'incomingMessage' ? (
      <div className='message'>
        <span className='message-username'>{username}</span>
        <span className='message-content'>{content}</span>
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
  username: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string
};

export default Message;
