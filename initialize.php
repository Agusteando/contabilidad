<?php

//This php select query purpose is to fetch contratos to pass them to google sheets build valid list of students.

$plantel = $_POST['plantel'];
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

$sql = "SELECT id,apellidoPaterno,apellidoMaterno,nombres,servicio,plantel,grado,tiempoextendido,costo,estatus FROM contratos WHERE plantel = '$plantel'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
        //Fetch rows
$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
echo json_encode($json );
    }else{
        echo "No se encontraron contratos";
    }



$conn->close();
?>