<?php
  //inclusão de arquivo para testar a conexão com o banco de dados
  include_once("conexion.php");

  //capturando informações do formulário html
  $nome = $_POST['nome'];
  $usuario = $_POST['usuario'];
  $email = $_POST['email'];

  //inserindo na tabela
  $sql = "INSERT INTO usuarios (nomeCompleto, nomeUsuario, emailUsuario) VALUES ('$nome', '$usuario', '$email')";

  //salvando
  $salvar = mysqli_query($conexion, $sql);
  $linhas = mysqli_affected_rows($conexion);

  mysqli_close($conexion);
 ?>
//página de confirmação
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
           <h1>Confirmação de Inserção</h1><hr><br>
           <?php
              if($linhas == 1){
                echo "Inserção bem sucedido!";
              }else{
                echo "Falha na inserção! Há um outro já cadastrado com esse email.";
              }
            ?>
         </section>

       </div>
     </section>
   </body>
 </html>
