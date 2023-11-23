/* Default imports */
import React, {useRef, useState} from 'react';
import styleLogin from './login.module.css';
import axios from 'axios';


// Code ...
function Login  (props)  {
const loginForm = useRef(styleLogin.form);

  function onLoginSubmit(e) {
    e.preventDefault();
    const formLoginData = new FormData(loginForm.current);
    const res = axios.postForm('http://e-commercePHP.dp.ua/api/login.php',
        formLoginData, {
          responseType: 'json', // Указываем, что ожидаем JSON в ответе
        });
    res.then(response => {
      console.log(response.data.result);
      localStorage.setItem("isOnline",JSON.stringify(response.data.autorize));
      setCookie('isOnline',JSON.stringify(response.data.autorize),1)
    }).catch(error => {
      console.error('Произошла ошибка при выполнении запроса:', error);
    });

  }

  function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Устанавливаем срок действия куки в днях
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  }


  return (
      <>
        <form className={styleLogin.form} ref={loginForm} onSubmit={onLoginSubmit}>
          <label htmlFor="login">Введите свой логин</label>
          <input className={styleLogin.input} type="text" name="login"
                 placeholder="Введите свой логин"/>
          <label htmlFor="password">Введите пароль</label>
          <input className={styleLogin.input} type="password" name="password"
                 placeholder="Введите свой пароль"/>
          <button className={styleLogin.button} type="submit">Войти</button>
          <div className={styleLogin.p}>
            <p className={styleLogin.p}>Не зарегистрованы?</p>
            <div><a className={styleLogin.a}
                    href="/">Зарегистрироваться</a>
              <a className={styleLogin.a}
                 href="/">Забыл пароль</a></div>
          </div>
        </form>
      </>
  );
};

export default Login;