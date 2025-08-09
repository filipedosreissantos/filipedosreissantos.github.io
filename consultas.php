<?php
    //incluindo teste de conexãos
    session_start();
    $_SESSION['controle'] = 0;
    include_once("conexion.php");

    //consulta ao banco
    $filtro = isset($_GET['filtro'])?$_GET['filtro']:"";
    $sql = "SELECT * FROM usuarios WHERE nomeCompleto  LIKE '%$filtro%' ORDER BY nomeCompleto";
    $consulta = mysqli_query($conexion, $sql);
    $registro = mysqli_num_rows($consulta);

    mysqli_close($conexion);
 ?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Cadastro</title>
    <link rel="stylesheet" href="_css/cadastro.css"/>
  </head>
  <body>
    <section>
      <div class="container">

        <nav>
          <ul class="menu">
            <li>Usuários</li>
            <a href="cadastro.html"><li>Cadastro</li></a>
            <a href="consultas.php"><li>Consultas</li></a>
            <a href="login.html"><li>Sair</li></a>
          </ul>
        </nav>

        <section>
          <h1>Consultas</h1><hr><br>

          <form action="" method="get">
            Filtrar por nome: <input type="text" name="filtro" class="campo" required autofocus/>
            <input type="submit" value="pesquisar" class="btn">
          </form>
            <?php
                echo "$registro fo(i)(ram) encontrado(s).";
                echo "<br><br>";
                while($exibirRegs = mysqli_fetch_array($consulta)){
                    $codigo = $exibirRegs[0];
                    $nomeC = $exibirRegs[1];
                    $nomeU = $exibirRegs[2];
                    $email = $exibirRegs[3];

                    echo "<article>";
                    echo "$codigo<br>";
                    echo "$nomeC<br>";
                    echo "$nomeU<br>";
                    echo "$email";
                    echo "</article>";
                }
                mysqli_close($conexion);
             ?>
        </section>

      </div>
    </section>
  </body>
</html>
