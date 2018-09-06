import React from 'react';
import PropTypes from 'prop-types';

function Nav({clients}) {

  const clientDisplay = (Object.keys(clients).length === 1) ? '1 client connected: (you!)' : `${Object.keys(clients).length} clients connected` ;

  return (
    <nav className='navbar'>
    <a href='/' className='navbar-brand'>
      Chatty
    </a>
    <p className='client-display'>{clientDisplay}</p>
  </nav>
  );
}

Nav.propTypes = {
  clients: PropTypes.object
};

export default Nav;