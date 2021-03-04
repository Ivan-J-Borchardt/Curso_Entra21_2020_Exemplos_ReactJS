/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : Integrating Back and Frontend on the same project -  Frontend Side
 * Date        : 01.2021 
 ************************************************************************************************/

import React from 'react'; 
import './App.css'; 


function Componente(){

  const [mensagem, setMensagem] = React.useState('');

  React.useEffect(function(){
    var xhr = new XMLHttpRequest(); 

    xhr.open("GET", "/api/mensagem"); 

    xhr.addEventListener("load", function(){
        var resposta = xhr.responseText; 

        var resp = JSON.parse(resposta); 
        setMensagem(resp.express); 
    });

    xhr.send(); 
  });

  return(
    <div>
      <p>{mensagem}</p>
    </div>

  );
}

function App(){
    return(
      <div className="App">
        <Componente/>
      </div>
    );

}

export default App; 