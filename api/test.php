<?php

require 'connect.php';

$query = "SELECT full_name,isOnline FROM `users` WHERE (login='tienam123' OR email='dr.tienam123@gmail.com')";
$res = $connect->query($query);
 $row = $res->fetch_assoc();
 var_dump($row);