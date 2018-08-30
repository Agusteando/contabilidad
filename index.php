<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard main</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/fonts.css">
	
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>

  <ul class="nav">
    <li><a href="reset-password.php" class="btn btn-secondary" style="float: left;">Cambiar contraseña</a></li>
	<li><?php if ($_SESSION["username"] === "Sistemas") { echo "<a href='register.php' class='btn custom1' style='float: left;'>Dar de alta a un usuario nuevo</a>";}?></li>
	<li><a href="index.php" class="btn btn-secondary" style="float: right;"><span class="glyphicon glyphicon-home"></span>Menú principal</a></li>
	
	<li><a href="logout.php" class="btn btn-secondary" style="float: right;">Cerrar sesión</a></li>
	<li>Loggeado como <span class="glyphicon glyphicon-user"></span><b><?php echo htmlspecialchars($_SESSION["username"]); ?> </b></li>
    </ul>

    <div class="page-header" style="display:inline-block;">
		<h1 id="logo"></h1>
        <h1 id="colors" hidden>Hola, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>! Bienvenido a la nueva plataforma de contabilidad.</h1>
    </div>

	
<form action="dashboard.php" method="get">

<div class="wrapper">

<button class="btn-plantel" name="plantel" type="submit" id="PM" value="PM">PM</button>
<button class="btn-plantel" name="plantel" type="submit" id="SM" value="SM">SM</button>
<button class="btn-plantel" name="plantel" type="submit" id="KM" value="KM">KM</button>
<button class="btn-plantel" name="plantel" type="submit" id="PT" value="PT">PT</button>
<button class="btn-plantel" name="plantel" type="submit" id="ST" value="ST">ST</button>
<button class="btn-plantel" name="plantel" type="submit" id="KT" value="KT">KT</button>

</div>
  </form>
  


	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/rainbowvis.js"></script>
	<script src="js/colors.js"></script>
</body>
</html>