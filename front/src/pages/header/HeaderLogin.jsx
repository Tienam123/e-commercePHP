import React from 'react';

function HeaderLogin() {
  return (
      <div className="header__actions actions-header-menu">
        <button
            className="actions-header-menu__button btn">Login
        </button>
        <button
            className="actions-header-menu__button btn">Register
        </button>
      </div>
  );
}

export default HeaderLogin;