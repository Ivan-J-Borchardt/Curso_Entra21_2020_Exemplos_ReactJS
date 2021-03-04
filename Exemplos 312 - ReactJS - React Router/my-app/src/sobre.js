/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : Exp. 1: Changing the header dynamically
 *               Exp. 2: Jumping to another page by triggering an event (using Redirect)
 * Date        : 23.01.2021 
 ************************************************************************************************/

import React from "react"; 
import { Link } from 'react-router-dom'; 
import { Redirect } from 'react-router';



function Sobre(props) {

    // Exp. 1: 
    //Trocando o componente menu a partir de algum evento (clique de botão, por exemplo)
    //A função trocarMenu do componente Routes é disparado atravé de props. Note que é possível 
    //passar paramentros na chamada da função. 
    function teste(){
        props.trocarMenu("Lídia");
    }


    //Exp. 2: 
    //Ir para outra página (outra rota) a partir do disparo de algum evento usando "Redirect"
    var [state, setState] = React.useState({redirect: false});

    function handleClick(){
       // window.location.assign("/ofertas"); //isto funciona porém recarrega a página 
       setState({redirect: true});

    }

    if (state.redirect) {
        return <Redirect push to="/ofertas" />;
    }
     


    return (
        <div>
            <h1>Sobre</h1>
            <p><Link to="/ofertas"> Veja mais ofertas aqui</Link></p> 
            <button type="button" onClick={handleClick}>Ofertas</button>
            <button type="button" onClick={teste}>Menu</button>
        </div>
    );
}

export default Sobre;
