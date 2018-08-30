<?php

var $apellidoM = $_POST["apellido materno"];
var $apellidoP = $_POST["apellido paterno"];
var $birth = $_POST["fecha de nacimiento"];
var $grado = $_POST["grado"];
var $genero = $_POST["género"];
var $nombres = $_POST["nombres"];
var $plantel = $_POST["plantel"];
var $servicio = $_POST["servicio que contrata"];
var $telefono = $_POST["teléfono"];

$servername = "localhost";
$username = "root";
$password = "nicole";
$dbname = "contabilidad";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO contratos (apellidoPaterno, apellidoMaterno, birth, grado, genero, nombres, plantel, servicio, telefono)
VALUES ($apellidoM, $apellidoM, $birth $grado, $genero, $nombres, $plantel, $servicio, $telefono)";


$result = $conn->query($sql);


?>