/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : Integrating Back and Frontend on the same project - This is the Backend Server
 * Date        : 01.2021 
 ************************************************************************************************/

const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

//Rota simples para testar o server 
app.get('/api/mensagem', function (req, res) {
    res.send({ express: "Hello Do Back-Ende" });
});


//Escutando a porta 5000 para receber as requisições 
app.listen(port, function () {
    console.log("Server rodando na porta " + port);
});



/************************************************************************************************
*   1. Para rodar tanto o Back quanto o Frontent no mesmo servidor será necessário instalar a
*   dependencia "concurrently":
*       package.json do Server:
*          "devDependencies": {
*              "concurrently": "^3.5.0"
*          }
*
*   2. O server rodará na porta 3000, contudo o Frontend enviará as requisições para a porta 5000
*       package.json do front:
*
*           "proxy": "http://localhost:5000/", 
*
*      Observe que o Backand está escutando na porta 5000...
*
*   3. Start da aplicação: 
*      package.json do Server:
*          "scripts": {
*             "client": "cd my-app && npm start",
*             "server": "node server.js",
*             "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""
*           },
*   
*      Para iniciar a aplicação no cmd: >npm run dev

************************************************************************************************/
