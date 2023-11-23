import React, {useRef, useState} from 'react';
import styleForm from './register.module.css';
import axios, {postForm} from 'axios';

function Register() {
  const refForm = useRef(styleForm.form);
  let [objectFromBackEnd, setResponce] = useState(false);

  async function onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(refForm.current);
    const res = axios.postForm('http://e-commercePHP.dp.ua/api/register.php',
        formData, {
          responseType: 'json', // Указываем, что ожидаем JSON в ответе
        });
    res.then(response => {
      setResponce(response.data);
    }).catch(error => {
      console.error('Произошла ошибка при выполнении запроса:', error);
    });
  }

  return (
      <form className={styleForm.form} ref={refForm} onSubmit={onFormSubmit}>
        <label htmlFor="full_name">Введите Имя и Фамилию</label>
        <input className={styleForm.input} type="text" name="full_name"
               placeholder="Введите свое полное"/>
        <label htmlFor="login">Введите свой логин</label>
        <input className={styleForm.input} type="text" name="login"
               placeholder="Введите свой логин"/>
        <label htmlFor="email">Введите свой адрес электронной почты</label>
        <input className={styleForm.input} type="email" name="email"
               placeholder="Введите свой E-mail"/>
        <label htmlFor="password">Введите пароль</label>
        <input className={styleForm.input} type="password" name="password"
               placeholder="Введите свой пароль"/>
        <label htmlFor="password_confirm">Введите подтверждение пароля</label>
        <input
            className={styleForm.input}
            type="password"
            name="password_confirm"
            placeholder="Введите подтверждение пароля"
        />
        <button className={styleForm.button} type="submit">Регистрация</button>
        <p className={styleForm.p}>
          У вас есть аккаунт? - <a className={styleForm.a}
                                   href="./index.html">Войти</a>
        </p>
        {
          objectFromBackEnd.status === 101
              ?
              (<p className={styleForm.msg} style={{color: 'green'}}>Вы успешнно
                зарегистрованы</p>)
              :
              objectFromBackEnd.status === 201
                  ?
                  (<p className={styleForm.msg} style={{color: 'red'}}>Данные не
                    прошли валидацию</p>)
                  :
                  objectFromBackEnd.status === 103
                      ?
                      (<p className={styleForm.msg}
                          style={{color: 'red',textAlign:'center',fontSize:'18px'}}>Пользователь с таким логином или почтой
                        уже сушествует</p>)
                      :
                      (<p style={{opacity: 0}}>Какой то текст</p>)
        }
      </form>
  );
}

export default Register;