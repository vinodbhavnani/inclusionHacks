import React from 'react';
import './Header.scss';

function Header() {
  return (
    <div className="Header">
      <ul>
        <a href="/">Home</a>
        <a href="/features">Features</a>
      </ul>
    </div>
  );
}

export default Header;
