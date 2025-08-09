<?php
  //iniciando a sessão
  session_start();
  /*$user = filipereis
    $password = admin
    O banco de dados "cadastro" com a tabela "usuarios" foi criado dentro da interface phpMyAdmin*/


  //declarando o acesso ao  banco de dados criado através da interface gráfica
  $hostname = "localhost";
  $user = $_SESSION['login'];
  $password = $_SESSION['senha'];
  $database = "cadastro";
  $conexion = mysqli_connect($hostname, $user, $password, $database);

  //testando conexão
  if(!$conexion){
    echo "Error ao tentar conectar o banco de dados";
  }else if($_SESSION['controle'] == 1){
    echo "<script>document.location='cadastro.html'</script>";
  }
 ?>
