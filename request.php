<?php
$PLANTEL = $_POST["plantel"];
$SERVICIO = $_POST["servicio"];
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

$sql = "SELECT id,apellidoPaterno,apellidoMaterno,nombres,genero,servicio FROM contratos WHERE plantel='$PLANTEL' AND servicio='$SERVICIO'";
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