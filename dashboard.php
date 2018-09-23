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
	<link rel="stylesheet" href="css/jquery-ui.theme.css">
	<link rel="stylesheet" href="css/timepicker.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/fonts.css">
	<link rel="stylesheet" href="css/jquery.timepicker.min.css">
	<link rel="stylesheet" href="css/jquery.contextMenu.min.css">
	<link rel="stylesheet" href="css/all.min.css">



	
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>

    <ul class="nav" style="z-index: 1000;">
    <li><a href="reset-password.php" class="btn btn-secondary" style="float: left;">Cambiar contraseña</a></li>
	<li><?php if ($_SESSION["rol"] === "admin") { echo "<a href='register.php' class='btn custom1' style='float: left;'>Dar de alta a un usuario nuevo</a>";}?></li>
	<li><a href="index.php" class="btn btn-secondary" style="float: right;"><span class="glyphicon glyphicon-home"></span>Menú principal</a></li>
	<li><a href="dashboard.php?plantel=<?php echo $_GET['plantel'];?>"	class="btn btn-secondary" style="float: right;">Regresar</a></li>
	<li><a href="logout.php" class="btn btn-secondary" style="float: right;">Cerrar sesión</a></li>
	<li>Loggeado como <span class="glyphicon glyphicon-user"></span><b><?php echo htmlspecialchars($_SESSION["username"]); ?> </b></li>
    </ul>

	
<div id="container">

<form id="selectionScreen" action="" method="get">
<div id="categorias">
<input id="plantel" type="text" name="plantel" value="<?php if (isset($_GET['plantel'])) { echo $_GET['plantel']; } else { header("location: index.php"); exit; } ?>" hidden>
<input id="servicio" type="text" name="servicio" value="<?php if (isset($_GET['servicio'])) { echo $_GET['servicio']; } ?>" hidden>
</div>
</form>
</div>



<div id="containerTwo" class="" style="display:none;">

<div id="wrapper">
  <div id="sidebar-wrapper" class="ui-widget-shadow">
    <ul class="sidebar-nav" style="">
      <li class="sidebar-brand">
	  
	  <button class="btn custom1" id="agregarContrato" style="margin-bottom: 5px; font-size: 20px; width: 100%; cursor:pointer;"><span class="glyphicon glyphicon-plus" style="float: left"></span>Nuevo contrato</button>
	  
	  </li>
	  <li>
	  
	  <button class="btn custom1" id="agregarEventual" style="margin-bottom: 5px; font-size: 20px; width: 100%; cursor:pointer;"><span class="glyphicon glyphicon-plus" style="float: left"></span>Eventuales</button>
	  
</li>
	  <li>
	  	  <button class="btn custom1" id="agregarConcepto" style="margin-bottom: 5px; font-size: 20px; width: 100%; cursor:pointer;"><span class="glyphicon glyphicon-plus" style="float: left"></span>Conceptos</button>
	  </li>
	  <table id="tablaConceptos">
	  </table>
			 <form id="formEventual" method="get" style="display: none">
<fieldset>
<legend id="labelEventual"> Servicio eventual </legend>
<button id="guardarEventual" type="submit" class="btn custom1"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</button>
<p><label class="field" for="">Nombre:</label><input type="text" name="nombre" class="textbox-300"/></p>
<p><label class="field" for="">Grado y Grupo: </label><input type="text" name="grado" class="textbox-300"/></p>
<p><label class="field" for="">Costo: </label><input type="number" name="costo" class="textbox-300"/></p>
<p hidden><label class="field" for="">Tiempo extendido: </label><input type="time" name="tiempoextendido" class="textbox-300"></p>
<div class="hidden">
<p><label class="field" for="">Servicio:</label><input id="servicio" type="text" name="servicio" class="textbox-300" value="<?php if (isset($_GET['servicio'])) { echo $_GET['servicio']; } ?>"/></p>
<p><label class="field" for="">Plantel: </label><input id="plantel" type="text" name="plantel" class="textbox-300" value="<?php if (isset($_GET['plantel'])) { echo $_GET['plantel']; } ?>"/></p>
<p><label class="field" for="">Fecha: </label><input id="fecha" type="text" name="fecha" class="textbox-300" value="<?php echo date('Y-m-d'); ?>" /></p>
<p><label class="field" for="">Estatus: </label><input type="text" name="estatus" class="textbox-300" value="pendiente"/></p>
</div>
</fieldset>
</form>	  
	  
	  
    </ul>
  </div>
  <div id="page-content-wrapper">
    <div class="page-content">
      <div class="container">
	   <div class="row">
	   	<h2 style="float: left; margin: 10px;"><?php if (isset($_GET['servicio'])) { echo $_GET['servicio']; } ?></h2> <input id="fechaHoy" type="date" value="<?php echo date('Y-m-d'); ?>" name="fecha" readonly="readonly">
		<button id="2obj" class="btn custom1" style="font-size: 30px;">Guardar <p id="status"></p></button>
		<input id="almacenamiento" type="text" hidden>
		<input id="data" type="text" placeholder="data" hidden>
	   </div>
        <div class="row">
        <div class="col-md-12" id="contenido">
		  
		  
	<input id="timepicker" type="text" style="visibility: hidden; width: 0px; float: left;">
<form id="formContrato" method="get" style="display: none; margin-left: auto;margin-right: auto; width: 75%;"><div id="table" class="table-editable custom1">
    <span class="table-add glyphicon glyphicon-plus"></span>
    <table class="table">
	  <tr hidden>
        <th>apellidopaterno</th>
        <th>apellidomaterno</th>
        <th>nombres</th>
        <th>genero</th>
		<th>grado</th>
        <th>telefono</th>
		<th>email</th>
		<th>birth</th>
        <th>servicioquecontrata</th>
		<th hidden>costo</th>
		<th hidden>tiempoextendido</th>
		<th hidden>plantel</th>
		<th hidden>estatus</th>
      </tr>
      <tr>
        <td>Apellido Paterno</td>
        <td>Apellido Materno</td>
        <td>Nombres</td>
        <td>Género</td>
		<td>Grado</td>
        <td>Teléfono</td>
		<td>Correo electrónico</td>
		<td>Fecha de nacimiento </td>
        <td>Servicio que contrata</td>
	    <td>Costo</td>
		<td class="horaSalida" hidden>Tiempo Extendido</td>
		<td hidden>Plantel</td>
		<td hidden>Estatus</td>

      </tr>
      <tr>
        <td class="properPlz" contenteditable="true"></td>
        <td class="properPlz"contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz genderPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="datePlz" contenteditable="true"></td>
		<td class="servicioPlz" contenteditable="true"><?php if (isset($_GET['servicio'])) { echo $_GET['servicio']; } ?></td>
		<td class="costoPlz" contenteditable="true"></td>
		<td class="horaSalida" contenteditable="true" hidden><input id="showTime" style="opacity: 0" hidden></td>
		<td class="getPlantel" contenteditable="false" hidden><?php echo $_GET['plantel']; ?></td>
		<td hidden contenteditable="false">pendiente</td>
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
		<td class="properPlz genderPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>
		<td class="properPlz" contenteditable="true"></td>		
		<td class="datePlz" contenteditable="true"></td>
		<td class="servicioPlz" contenteditable="true"><?php if (isset($_GET['servicio'])) { echo $_GET['servicio']; } ?></td>
		<td class="costoPlz" contenteditable="true"></td>
		<td class="horaSalida" contenteditable="true" hidden></td>
		<td class="getPlantel" contenteditable="false" hidden><?php echo $_GET['plantel']; ?></td>
		<td hidden contenteditable="false">pendiente</td>

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
  <input id="export" type="text" name="add" hidden>
 
  <button id="export-btn" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</button>
  </form>
      

<div class="eventuales">
			 <div id="salon" class="navbar"></div>
				<div id="eventuales" style="width: 100%; position: fixed; bottom: 0; right: 0;">
				
				<div class="btn-group" role="group" aria-label="Basic example" style="position: absolute; top: 0; right: 0; margin: 10px">
				<button id="min" class="btn btn-secondary"><span class="glyphicon glyphicon-triangle-bottom"></span>Minimizar</button>
				<button id="max" class="btn btn-secondary"><span class="glyphicon glyphicon-triangle-top"></span>Maximizar</button>
				</div>
				<h2 style="float: left; width: 250px; color: white;">Eventuales: </h2></div>
				
</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>









</div>
<input id="conceptos" type="text" hidden>
<form id="2sheets" action="https://script.google.com/macros/s/AKfycbzqO3v7GmY6xM2XuGVvqOH4R6WkKWXudToa6lzx-kVSzOQD4b8/exec" method="post">
<input id="contratosSheets" name="contratos" type="text" required hidden>
<input id="dataSheets" name="data" type="text" required value="0" hidden>
<input id="plantelSheets" name="plantel" type="text" required value="<?php if (isset($_GET['plantel'])) { echo $_GET['plantel']; }?>" hidden>
</form>

	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.timepicker.min.js"></script>
	<script src="js/jquery.contextMenu.js"></script>
	<script src="js/jquery.ui.position.min.js"></script>
	<script src="js/context.js"></script>
	<script src="js/dashboard.js"></script>
	<script src="js/ajax.js"></script>
	<script src="js/tableEditable.js"></script>
	<script src="js/submit2sheets.js"></script>
	<script src="js/timepicker.js"></script>





</body>
</html>