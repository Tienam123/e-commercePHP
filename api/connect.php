<?php

$server = 'localhost';
$name = 'root';
$pass = '';
$db = 'api_tester';

$connect = new mysqli($server,$name,$pass,$db);
if ($connect->connect_error) {
    die($connect->connect_error);
}
