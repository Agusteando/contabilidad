<?php

 $apellidoM = $_POST["apellidomaterno"];
 $apellidoP = $_POST["apellidopaterno"];
 $birth = $_POST["birth"];
 $grado = $_POST["grado"];
 $genero = $_POST["genero"];
 $nombres = $_POST["nombres"];
 $plantel = $_POST["plantel"];
 $servicio = $_POST["servicioquecontrata"];
 $telefono = $_POST["telefono"];

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
VALUES ('$apellidoP', '$apellidoM', '$birth', '$grado', '$genero', '$nombres', '$plantel', '$servicio', '$telefono')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>