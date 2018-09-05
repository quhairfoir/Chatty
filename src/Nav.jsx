import React from 'react';
import PropTypes from 'prop-types';

function Nav({clients}) {

  console.log('This is Object.keys(clients).length:', Object.keys(clients).length);

  const clientDisplay = (Object.keys(clients).length === 1) ? '1 client connected: (you!)' : `${Object.keys(clients).length} clients connected` ;

  return (
    <nav className='navbar'>
    <a href='/' className='navbar-brand'>
      Chatty
    </a>
    <p className='clientDisplay'>{clientDisplay}</p>
  </nav>
  );
}

Nav.propTypes = {
  clients: PropTypes.object
};

export default Nav;