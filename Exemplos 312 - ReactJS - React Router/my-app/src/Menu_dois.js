import React from "react"; 




function Menu_dois(props) {

     
    //Perceba que o comoponente está imprimindo o nome do usuário, recebido por props
    return (
        <div>
            <h1>Menu Dois... {props.user}</h1>
        </div>
    );
}

export default Menu_dois;