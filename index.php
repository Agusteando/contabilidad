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
	
	<link rel="stylesheet" href="css/jquery-ui.css">
	<link rel="stylesheet" href="css/jquery-ui.theme.css">
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
	<li><?php if ($_SESSION["rol"] === "admin") { echo "<a href='register.php' class='btn custom1' style='float: left;'>Dar de alta a un usuario nuevo</a>";}?></li>
	<li><a href="index.php" class="btn btn-secondary" style="float: right;"><span class="glyphicon glyphicon-home"></span>Menú principal</a></li>
	
	<li><a href="logout.php" class="btn btn-secondary" style="float: right;">Cerrar sesión</a></li>
	<li>Loggeado como <span class="glyphicon glyphicon-user"></span><b><?php echo htmlspecialchars($_SESSION["username"]); ?> </b></li>
    </ul>

    <div class="page-header" style="display:inline-block;">
		<h1 id="logo"></h1>
        <h1 id="colors" hidden>Hola <b><?php echo htmlspecialchars($_SESSION["username"]); ?>.</b> Elige tu plantel. </h1>
    </div>
<input type="text" id="rol" value="<?php if (isset($_SESSION['rol'])) { echo $_SESSION['rol']; } ?>" hidden>
	
<form action="dashboard.php" method="get">

<div class="wrapper ui-dialog-content ui-widget-content">

<button class="btn-plantel ui-button ui-corner-all" name="plantel" type="submit" id="pm" value="PM">PM</button>
<button class="btn-plantel ui-button ui-corner-all" name="plantel" type="submit" id="sm" value="SM">SM</button>
<button class="btn-plantel ui-button ui-corner-all" name="plantel" type="submit" id="km" value="KM">KM</button>
<button class="btn-plantel ui-button ui-corner-all" name="plantel" type="submit" id="pt" value="PT">PT</button>
<button class="btn-plantel ui-button ui-corner-all" name="plantel" type="submit" id="st" value="ST">ST</button>
<button class="btn-plantel ui-button ui-corner-all" name="plantel" type="submit" id="kt" value="KT">KT</button>

</div>
  </form>
  


	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/rainbowvis.js"></script>
	<script src="js/colors.js"></script>
</body>
</html>