/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : Exp. 1: Add HTML dynamically  elements to a table
 *               Exp. 2: Catching the element that was clicked
 * Date        : 23.01.2021 
 ************************************************************************************************/
import React from "react"; 
import { Link } from 'react-router-dom'; 


var cont = 0; 
function Ofertas() {

    //Exp. 1: 
    //Adicionar elementos HTML dinâmicamente a uma tabela
    const [linhas, novasLinhas] = React.useState([]); 

    const addLinhas = function(){
        cont++ 
        var col1 = document.getElementById("idCol1").value; 
        var col2 = document.getElementById("idCol2").value; 
    
        
        novasLinhas([... linhas, <tr id={"id" + cont} className="linha" key={cont} onClick={pegaLinha}><td>{col1}</td><td>{col2}</td></tr>]);
        console.log(linhas); 
    }

    //Exp. 2: 
    //Capturando o elemento que foi clicado 
    //O evento OnClick foi adicionado no elemento Pai (tBody) o que possibilita capturar qual elemento filho foi clicado
    const pegaLinha = function(event){
        console.log("Cliquei em: "+ event.target + " Elemento Pai: "  + event.target.parentNode + " = " + event.target.parentNode.id);
    }

    return (
        <div>
            <h1 id="idA">Ofertas</h1>
            <p><Link to="/sobre">Mais detalhes aqui</Link></p>
            <p><Link to="/">Home</Link></p>
            <br/>

            <input type="text" id="idCol1" placeholder="Coluna 1"/><br/>
            <input type="text" id="idCol2" placeholder="Coluna 2"/><br/>
            <input type="button" value="Add Col" onClick={addLinhas}/><br/>



            <table>
                <tbody onClick={pegaLinha}>
                    {linhas}
                </tbody>
            </table>
        </div>
    );
}

export default Ofertas;