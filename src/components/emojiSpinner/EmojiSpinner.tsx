import React from 'react';

function EmojiSpinner({ message = 'Loading...', emoji = '🤔' }: any) {
  return (
    <div className="emoji-spinner">
      <span role="img" aria-label="loading" className="emoji">
        {emoji}
      </span>
      <p>{message}</p>
    </div>
  );
}

export default EmojiSpinner;
