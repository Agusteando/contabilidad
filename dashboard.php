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
    <title>Dashboard</title>
	<link rel="stylesheet" href="css/jquery-ui.css">
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
	<li><a href="dashboard.php?plantel=<?php echo $_GET['plantel'];?>"	class="btn btn-secondary" style="float: right;">Regresar</a></li>
	<li><a href="logout.php" class="btn btn-secondary" style="float: right;">Cerrar sesión</a></li>
	<li>Loggeado como <span class="glyphicon glyphicon-user"></span><b><?php echo htmlspecialchars($_SESSION["username"]); ?> </b></li>
    </ul>
	<h2 style="float: right; margin-right: 20px";></h2>
	
<div id="container">
<form id="selectionScreen" action="" method="POST">
<table id="categorias">
<input type="text" name="plantel" value="<?php if (isset($_GET['plantel'])) { echo $_GET['plantel']; } else { header("location: index.php"); exit; } ?>" hidden>
<input id="servicio" type="text" name="servicio" hidden>
</table>
</form>
</div>


<div id="containerTwo" style="display:none"><div id="contents" style="display: inline-block">


<form id="formContrato" method="get" style="display: none">

<button id="export-btn" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span>GUARDAR</button>
<div id="table" class="table-editable custom1">
    <span class="table-add glyphicon glyphicon-plus"></span>
    <table class="table">
	  <tr hidden>
        <th>apellidopaterno</th>
        <th>apellidomaterno</th>
        <th>nombres</th>
        <th>género</th>
		<th>grado</th>
        <th>teléfono</th>
		<th>fechadenacimiento</th>
        <th>servicioquecontrata</th>
		<th hidden>plantel</th>
      </tr>
      <tr>
        <td>Apellido Paterno</td>
        <td>Apellido Materno</td>
        <td>Nombres</td>
        <td>Género</td>
		<td>Grado</td>
        <td>Teléfono</td>
		<td>Fecha de nacimiento </td>
        <td>Servicio que contrata</td>
		<td hidden>Plantel</td>
      </tr>
      <tr>
        <td class="properPlz" contenteditable="true"></td>
        <td class="properPlz"contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="genderPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="datePlz" contenteditable="true"></td>
		<td class="servicioPlz" contenteditable="true"></td>
		<td class="getPlantel" contenteditable="false" hidden><?php echo $_GET['plantel']; ?></td>
        <td>
          <span class="table-remove glyphicon glyphicon-remove"></span>
        </td>
        <td>
          <span class="table-up glyphicon glyphicon-arrow-up"></span>
          <span class="table-down glyphicon glyphicon-arrow-down"></span>
        </td>
      </tr>
      <!-- This is our clonable table line -->
      <tr class="hide">
        <td class="properPlz" contenteditable="true"></td>
        <td class="properPlz"contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="genderPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="datePlz" contenteditable="true"></td>
		<td class="servicioPlz" contenteditable="true"></td>
		<td class="getPlantel" contenteditable="false" hidden><?php echo $_GET['plantel']; ?></td>
        <td>
          <span class="table-remove glyphicon glyphicon-remove"></span>
        </td>
        <td>
          <span class="table-up glyphicon glyphicon-arrow-up"></span>
          <span class="table-down glyphicon glyphicon-arrow-down"></span>
        </td>
      </tr>
    </table>
  </div>
  <input id="export" type="text" name="add">
</form>

</div>
<div id="sidebar">

<span id="add" style="font-size: 40px; width: 100%;" class="glyphicon glyphicon-plus-sign"></span>

<span id="addHover">Nuevo contrato</span></div>
</div>

	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/dashboard.js"></script>
	<script src="js/ajax.js"></script>
	<script src="js/tableEditable.js"></script>



</body>
</html>