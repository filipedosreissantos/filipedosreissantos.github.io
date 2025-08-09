<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Lenguas Latinas</title>
    <link rel="stylesheet" type="text/css" href="_css/estilo.css"/>
    <link rel="stylesheet" type="text/css" href="_css/form.css"/>
    <script language="javascript" src="_javascript/funcoes.js"></script>
  </head>
  <body>
    <div id="interface">
      <header id="encabezado">
        <hgroup>
          <h1>Lenguas Latinas</h1>
          <h2>En breve llegarás a ti</h2>
        </hgroup>
        <figure class="">
          <img id="imagenHome" src="_imagens/contato.png"/>
        </figure>
       <nav id="menu">
         <h1>Menú Principal</h1>
         <ul>
            <li onmouseover="cambiarFotoDelMenu('_imagens/home.png')" onmouseout="cambiarFotoDelMenu('_imagens/contato.png')"><a href="index.html">Home</a></li>
            <li onmouseover="cambiarFotoDelMenu('_imagens/especificacoes.png')" onmouseout="cambiarFotoDelMenu('_imagens/contato.png')"><a href="specs.html">Inmersión</a></li>
            <li onmouseover="cambiarFotoDelMenu('_imagens/fotos.png')" onmouseout="cambiarFotoDelMenu('_imagens/contato.png')"><a href="fotos.html">Fotos</a></li>
            <li onmouseover="cambiarFotoDelMenu('_imagens/multimidia.png')" onmouseout="cambiarFotoDelMenu('_imagens/contato.png')"><a href="multimidia.html">Multimidia</a></li>
            <li onmouseover="cambiarFotoDelMenu('_imagens/contato.png')" onmouseout="cambiarFotoDelMenu('_imagens/contato.png')"><a href="fale-conosco.php">Contacto</a></li>
         </ul>
        </nav>
      </header>

      <section id="full-body">
        <article id="noticia">
            <header id="cabarticle">
                <hgroup>
                    <h3>LenguasLatinas > Contacto</h1>
                    <h1>Hable con nosotros</h1>
                    <h2>por Filipe Reis</h2>
                    <h3 class="derecha">Actualizado en 07/Diciembre/2017</h3>
                </hgroup>
            </header>

            <?php
                $nombre = $email = $sexo = $fechaNacimiento = $mensagen = "";
                $nombreError = $emailError = $sexoError = "";


                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                  if (empty($_POST["nombre"])) {
                    $nombreError = "Nombre es obligatorio";
                  } else {
                    $nombre = test_input($_POST["nombre"]);

                    if (!preg_match("/^[a-zA-Z ]*$/",$nombre)) {
                      $nombreError = "Solo letras y espacios son permitidos";
                    }
                  }

                  if (empty($_POST["email"])) {
                    $emailError = "Email es obligatorio";
                  } else {
                    $email = test_input($_POST["email"]);

                    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                      $emailError = "Email inválido";
                    }
                  }

                  if (empty($_POST["fnasc"])) {
                    $fechaNacimiento = "";
                  } else {
                    $fechaNacimiento = test_input($_POST["fnasc"]);
                  }

                  if (empty($_POST["mens"])) {
                    $mensagen = "";
                  } else {
                    $mensagen = test_input($_POST["mens"]);
                  }

                  if (empty($_POST["usexo"])) {
                    $sexoError = "Sexo es obligatorio";
                  } else {
                    $sexo = test_input($_POST["usexo"]);
                  }
                }

                function test_input($data) {
                  $data = trim($data);
                  $data = stripslashes($data);
                  $data = htmlspecialchars($data);
                  return $data;
                }
            ?>

        <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
          <fieldset id="identificacion">
            <legend>Contacto</legend>
                <span class="error">*Obligatorio</span><br/>
                Nombre: <input type="text" name="nombre" id="tunombre" size="20" maxlenght"20" placeholder="Nombre..."value="<?php echo $nombre;?>"/><span class="error">* <?php echo $nombreError;?></span>
                <br/><br/>
                E-mail: <input type="email" name="email" id="femail" value="<?php echo $email;?>"/><span class="error">* <?php echo $emailError;?></span>
                <br/><br/>
                Fecha de Nacimiento: <input type="date" name="fnasc" id="fecha">
                <fieldset id="sex">
                   <legend>Sexo</legend>
                   <input type="radio" name="usexo" id="masc" <?php if (isset($sexo) && $sexo=="masculino") echo "checked";?> value="masculino"/> Masculino</br>
                   <input type="radio" name="usexo" id="femi" <?php if (isset($sexo) && $sexo=="feminino") echo "checked";?> value="feminino"/> Feminino
                </fieldset>

                Mensagen: <textarea name="mens" rows="5" cols="40"><?php echo $mensagen;?></textarea>
         </fieldset>

        <br/><input type="submit" value="Enviar" id="bb"/>

        </form>
        <?php
        echo "<h2>Your Input:</h2>";
        echo $nombre;
        echo "<br>";
        echo $email;
        echo "<br>";
        echo $sexo;
        echo "<br>";
        echo $fechaNacimiento;
        echo "<br>";
        echo $mensagen;
        echo "<br>";
        ?>
        </article>
      </section>
      <footer id="rodape">
        <p>&copy;Copyright 2017 - by Filipe Reis</p>
      </footer>
    </div>
  <body>
<html>
