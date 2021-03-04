/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : Routing the pages of the app 
 * Date        : 23.01.2021 
 ************************************************************************************************/


import React from 'react';
import App from './App';

import Sobre from './sobre';
import Ofertas from './ofertas';
import Menu_um from './Menu_um';
import Menu_dois from  './Menu_dois';
import {Switch, Route} from 'react-router-dom';


const Routes = function () {

    //A função trocarMenu está sendo disparada de dentro do componente "Sobre".
    //Veja mais abaixo como passar/receber props pela rota. 
    const [Menu, setMenu] = React.useState(<Menu_um/>);   

    const trocarMenu = function(userid){
        console.log("user:" + userid);
        setMenu(<Menu_dois user={userid}/>)
    }

    return (
        <div>
            {Menu}
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/sobre"  render={(props) => <Sobre {...props} trocarMenu={trocarMenu} />} />
                <Route path="/ofertas" component={Ofertas} exact />
                <Route component={() => <div>Página Não Encontrada  - Erro 404!</div>} />
            </Switch>
        </div>
    );
    
}

export default Routes;