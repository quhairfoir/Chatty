import React from 'react';
import PropTypes from 'prop-types';

function Message ({username, content}){
  console.log('This is username and content inside message:', username, content)
  return (
    <div className="message">
      <span className="message-username">{username}</span>
      <span className="message-content">
        {content}
      </span>
      {/* <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div> */}
    </div>
  );
}

Message.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string
};

export default Message;
