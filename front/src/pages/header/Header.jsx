import React, {useState} from 'react';
import './Header.scss';
import HeaderLogin from './HeaderLogin';
import HeaderLogout from './HeaderLogout';

function Header(props) {
  function onClickLogout(props) {
    console.log('click');
  }

  return (
      <>
        <header className="header">
          <div className="header__container">
            {
              props.isAuth ?
                  (<HeaderLogout/>) :
                  (<HeaderLogin/>)
            }
          </div>
        </header>
      </>
  );
}

export default Header;