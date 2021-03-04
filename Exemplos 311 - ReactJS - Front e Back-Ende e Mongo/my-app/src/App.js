/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : Example of API consumption using AJAX
 * Date        : 01.2021 
 ************************************************************************************************/
import React from 'react';
import './App.css';


/************************************************************************************************ 
 *  Componente Login 
 ************************************************************************************************/
function ComponentLogin(props) {
  return (
    <div id="idLogin">
      <form action="/api/user" method="POST">
        <p>{props.titulo}</p>
        <input type="text" id="idUser" name="nmUser" placeholder="Usuário" />
        <br />
        <input type="password" id="idSenha" name="nmSenha" placeholder="Senha" />
        <br />
        <input type="checkbox" id="idUserCad" name="nmUserCad" value="naoCad" />
        <label htmlFor="idUserCad">Ainda não tenho cadastro</label>
        <br />
        <input type="file" id="idFile"/>
        <br />
        <input type="button" value="Login" onClick={props.onLogin} />
        <p>{props.statusAcesso}</p>
      </form>

      <img src={props.pathImagem} alt="Imagem salva"/>
    </div>
  );
}


/************************************************************************************************ 
 *  App 
 ************************************************************************************************/
function App() {

  /* ------------  Exemplo de consumo de API -----------------
  *  *React.useState --> Garante que o titulo seja renderizado no tela, mesmo que a tela já tenha sido renderizada 
  *  *React.useEffect -> "Dispara" a chamada da API assim que App é chamado
  */
  const [titulo, setTitulo] = React.useState('estado ini');

  React.useEffect(function () {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/mensagem");

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      //console.log("Resposta: " + xhr.response);
      //console.log("Texto" + xhr.responseText);
      var resp = JSON.parse(resposta);
      setTitulo(resp.express);
    });

    xhr.send();
  });
  //-------------------------------------------------------------------------------------------------------------------

  /* -----  Função que é disparada quando o botão Login é clicado -----------------------------------------------------
  *  Esta função é passada por referencia via props para o componente ComponentLogin, onde ela 
  *  é chamada no evento onCLick do botão Login   
  */
  const validaLogin = function () {
    var userSC = document.getElementById("idUser").value;
    var passSC = document.getElementById("idSenha").value;
    var isNotCad = document.getElementById("idUserCad").checked;

    if (isNotCad) {
      cadastrarUser(userSC, passSC);
    } else {
      validaUser(userSC, passSC);
    }

  }

  /***************************************************************************************
   *   Valida UserId e Senha 
   ***************************************************************************************/
  const [statusAcesso, setStatusAcesso] = React.useState("");

  var validaUser = function (user, pass) {
    console.log(user + " " + pass);
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/user/nm/" + user);

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;
      console.log(resposta);
      //console.log("Resposta: " + xhr.response);
      //console.log("Texto" + xhr.responseText);
      var resp = JSON.parse(resposta);

      if (resp.length > 0) { //Testa se o User foi encontrado no DB
        if (resp[0].senha === pass) {
          setStatusAcesso("Acesso Autorizado");
        } else {
          setStatusAcesso("Senha inválida");
        }
      } else {
        setStatusAcesso("Usuário não cadastrado");
      }
    });

    xhr.send();
  }

  /***************************************************************************************
   *   cadastrar o usuario    e   upload de imagem 
   ***************************************************************************************/

  const [pathImagem, setPathImagem] = React.useState("");

  var cadastrarUser = function (user, pass) {

   //Upload de imagem para o servidor  ==============================================
    const imagem = document.getElementById("idFile");

    var xhr0 = new XMLHttpRequest();
    var formData = new FormData();  

    formData.append("imagem", imagem.files[0]);
    xhr0.open('POST', '/api/img');
    xhr0.addEventListener ("load", function(){
      var resp = JSON.parse(xhr0.responseText);
      console.log("-->" + resp.imagem); 
      setPathImagem(resp.imagem);
    });

    xhr0.send(formData);

    //Cadastro do usuario ==============================================
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/user", true);

    // Envia a informação do cabeçalho junto com a requisição.
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.addEventListener("load", function () {

      var resposta = xhr.responseText;

      //console.log("Resposta: " + xhr.response);
      //console.log("Texto" + xhr.responseText);
      var resp = JSON.parse(resposta);
   
      setStatusAcesso(resp.message);
      
    });

    xhr.send("nmUser="+user+"&nmSenha="+pass);
  }

  /************************************************************************************************************
   * Return do App
   ************************************************************************************************************/
  return (
    <div className="App">
      <ComponentLogin titulo={titulo} onLogin={validaLogin} statusAcesso={statusAcesso} pathImagem={pathImagem} />
    </div>
  );
}

export default App;
