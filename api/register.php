<?php
header('Access-Control-Allow-Origin: *'); // или укажите конкретный домен, разрешенный для доступа
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: json/application');
require 'functions.php';
require 'connect.php';
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        var_dump($_GET);
        // Обработка GET-запроса
        // например: $value = $_GET['key'];
        break;

    case 'POST':
        // Обработка POST-запроса

        //Отправка почты
        sendRegisterForm($connect,$_POST);

        // например: $value = $_POST['key'];

        break;


    case 'PATCH':
        //     // Обработка PUT-запроса
        echo 'PUT';
        break;

    case 'DELETE':
        //     // Обработка DELETE-запроса
        echo 'DELETE';
        break;

}

?>