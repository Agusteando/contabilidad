<?php
$data = $_POST['almacenamiento'] ?? '';
$plantel = $_POST['plantel'] ?? '';

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

$sql = "UPDATE general SET almacenamiento = '$data' WHERE plantel = '$plantel'";
$result = $conn->query($sql);


if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}



$conn->close();
?>