<?php
//Подключение к базе данных
require 'connect.php';

//Отправка формы
function sendRegisterForm($connect, $data)
{
    $full_name = $data['full_name'];
    $login = $data['login'];
    $email = $data['email'];
    $pass = $data['password'];
    $pass_confirm = $data['password_confirm'];

    $errors = [];
    //Запись ошибок
    $error_name = validateUserName($full_name);
    if ($error_name !== null) {
        $errors['name'] = $error_name;
    }
    $error_mail = validateUserMail($email);
    if ($error_mail !== null) {
        $errors['mail'] = $error_mail;
    }
    $error_pass = validatePassword($pass);
    if ($error_pass !== null) {
        $errors['password'] = $error_pass;
    }
    $error_confirm = confirmedPassword($pass, $pass_confirm);
    if ($error_confirm !== null) {
        $errors['pass_conf'] = $error_confirm;
    }
    //    Запись данных в базу
    if (empty($errors)) {
        $query = "SELECT * FROM `users` WHERE login='$login' OR email='$email'";
        $res = $connect->query($query);
        if ($res->num_rows > 0) {
            http_response_code(201);
            $print_message_errorSQL = [
                "status" => 103,
                "message" => "Пользователь существует",
            ];
            echo json_encode($print_message_errorSQL);
        } else {
            $query = "INSERT INTO `users` (`id`, `full_name`, `login`, `email`, `password`, `role`, `isOnline`) VALUES 
                                    (null,'$full_name','$login','$email','$pass','user',null) ";
            $res = $connect->query($query);

            http_response_code(201);
            $res = [
                'data' => $data,
                "status" => 101,
                "message" => "Вы успешно зарегистрированы",
            ];
            echo json_encode($res);
        }
    } else {
        $res = [
            "status" => 201,
            "message" => "Данные не прошли валидацию",
        ];
        echo json_encode($res);
    }
}

function sendLoginForm($connect, $data)
{
    //Записываем даннные полученные из массива $_POST
    $login = $data['login'];
    $pass = $data['password'];


    //Получаем данные из Базы данных
    $query = "SELECT * FROM `users` WHERE (login='$login' OR email='$login') AND password='$pass'";
    $res = $connect->query($query);
    if (!$res->num_rows < 1) {
        http_response_code(201);
        $query = "UPDATE `users` SET isOnline = 'online' WHERE login='$login' OR email='$login'";
        $res = $connect->query($query);
        $query = "SELECT full_name FROM `users` WHERE login='$login' or email='$login'";
        $res = $connect->query($query);
        $row = $res->fetch_assoc();
            $res = [
                'auntificated' => $login,
                'autorize' => getInfoUserOnline($connect,$data),
                'result' => true,
                'message' => 'Выполняется вход в личный кабинет'
            ];
            echo json_encode($res);



    } else {
        http_response_code(201);
        $auth = [
            'result' => false,
            'message' => 'Логин или пароль введены неверно'
        ];
        echo json_encode($auth);
    }


}

function getInfoUserOnline($connect,$data) {
    $login = $data['login'];
    $query = "SELECT full_name,isOnline FROM `users` WHERE (login='$login' OR email='$login')";
    $res = $connect->query($query);
    $row = $res->fetch_assoc();
    $row['result'] = true;
    return $row;
}

//Функции Валидации
function validateUserName($username)
{
    $pattern = '/^[А-Яа-яЁё]+\s[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/u';
    if (empty($username) || preg_match($pattern, $username)) {
        return 'Некоректно введено ФИО';
    }
}

function validateUserMail($usermail)
{
    if (empty($usermail) || !filter_var($usermail, FILTER_VALIDATE_EMAIL)) {
        return 'Некорректный email';
    }
}

function validatePassword($password)
{
    $pattern = '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{10,}$/';
    if (empty($password) || preg_match($pattern, $password)) {
        return 'Пароль должен содержать минимум 10 символов и максимум 20 символов, а также строчную букву,заглавную букву,символ';
    }
}

function confirmedPassword($password, $pass_confirm)
{
    if ($password !== $pass_confirm) {
        return 'Пароли не совпадают';
    }
}

?>