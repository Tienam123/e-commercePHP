import React, {useState} from 'react';
import Header from './pages/header/Header';
import Register from './pages/cabinet/Register/Register';
import Login from './pages/cabinet/Login/Login';

function App(props) {
  const [isOnline, setOnline] = useState(true);

  function online(active) {
    setOnline(active);
  }

  return (
      <div>
        <Header onClick={console.log('click')}></Header>
        <Register/>
        <Login/>
      </div>
  );
}

export default App;