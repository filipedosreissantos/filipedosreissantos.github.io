<?php
    /*iniciando sessão na página de login para validar
    o administrador do bando de dados*/
    session_start();

    //condição de existência de informções no formulário de login
    if(isset($_POST['login']) && strlen($_POST['login']) > 0){
      $_SESSION['login'] = $_POST['login'];
      $_SESSION['senha'] = $_POST['senha'];
      $_SESSION['controle'] = 1;
      echo "<script>document.location='conexion.php'</script>";
      }

 ?>
