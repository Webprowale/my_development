<?php
$servername ="localhost";
$username ="root";
$password ="";
$dbname ="ccctv";

 $conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
    die("could not connect to the database".mysqli_connect_error());
}
?>