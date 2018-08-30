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

$sql = "SELECT apellidoPaterno,apellidoMaterno,nombres,genero,servicio FROM contratos WHERE plantel='$PLANTEL' AND servicio='$SERVICIO'";
$result = $conn->query($sql);

echo "<table>";
if ($result->num_rows > 0) {
        //Fetch rows
 while($row = $result->fetch_assoc()) {
            echo "<tr><td>".$row['alumno']."</td><td>".$row['servicio']."</td></tr>";
        }
    }else{
        echo "<tr><td>No se encontraron contratos</td></tr>";
    }
    echo "</table>";


$conn->close();
?>