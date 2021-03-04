/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : - A REST API with a complete CRUD Schema Using Node Express to create the 
 *                 routes and Mongoose to connect with the MongoDB; 
 *               - The route "/api/img" is a special route for upload images
 * Date        : 01.2021 
 ************************************************************************************************/

const express = require('express');

const bodyParser = require('body-parser'); 

const app = express();


const port = process.env.PORT || 5000;

//Conectando no banco de dados 
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/dbTeste", { useMongoClient: true })
.then(function () {
  console.log("MongoDB Conectado...");
})
.catch(function (err) {
  console.log("Erro ao conectar ao DB: " + err);
});

var User = require('./model/user');


//Body Parser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Ecutando a porta para receber as requisições http 
app.listen(port, () => console.log(`Listening on port ${port}`));


//Rota teste... 
app.get('/api/mensagem', (req, res) => {
  res.send({ express: 'Hello From Express' });
  
  
});


// Rotas do CRUD ------------------------------------------------------------------------------

/*****************************************************************
      Salva novo User
******************************************************************/
app.post('/api/user', function (req, resp) {
  //resp.send("Furmulário recebido!!!: " + req.query.nmValor);  - *.query.* para o método GET
  var user = new User();

  user.usuario = req.body.nmUser;
  user.senha = req.body.nmSenha;
  user.status = true;

  user.save()
    .then(function () {
      console.log("Usuario cadastrado com sucesso!");
      resp.json({ message: "Usuario cadastrado com sucesso!" });
    }).catch(function (error) {
      console.log(error);
      resp.send("Erro no DB...: " + error);
    })
});

/*****************************************************************
      Busca todos os Users Cadastrados
******************************************************************/
app.get('/api/user', function (req, resp) {
  User.find(function (error, users) {
    if (error) {
      console.log("Erro ao buscar todos os usuarios: " + error);
      resp.send("Erro no DB...: " + error)
    } else {

      resp.json(users);
    }
  });

});

/*****************************************************************
      Busca  User por _id
******************************************************************/
app.get('/api/user/:id', function (req, resp) {

  console.log("req.param.id : " + req.params.id);
  User.findById(req.params.id, function (error, user) {
    if (error) {
      resp.send('Erro no DB...: ' + error);
    } else {
      resp.json(user);
    }
  })
});

/*****************************************************************
      Busca  User por usuario (login)
******************************************************************/
app.get('/api/user/nm/:user', function (req, resp) {

  console.log("req.param.user: " + req.params.user);
  User.find({ usuario: req.params.user }, function(error, user){
    if(error){
      resp.send('Erro do DB...: ' + error);
    }else{
      resp.json(user);
    }
  });

});

/*****************************************************************
      Altera um User especifico - busca por _id
******************************************************************/
app.put('/api/user/:id', function (req, resp) {

  User.findById(req.params.id, function (error, user) {
    if (error) {
      resp.send('Usuario não cadastrado...: ' + error);
    } else {
      user.usuario = req.body.nmUser;
      user.senha = req.body.nmSenha;
      user.status = false;

      user.save(function (error) {
        if (error) {
          resp.send('Erro no DB...: ' + error);
        } else {
          resp.json({ message: 'Usuario atualizado com sucesso' });
        }
      })
    }
  })
});

/*****************************************************************
      Delete um User específico - Busca por _id
******************************************************************/
app.delete('/api/user/:id', function (req, resp) {

  User.deleteOne({ _id: req.params.id })
    .then(function (result) {
      console.log("Usuário deletado com sucesso " + JSON.stringify(result));
      resp.json({ message: 'Usuario atualizado com sucesso' });
    }).catch(function (err) {
      console.log("Erro no DB...: " + err);
      resp.send('Erro no DB...: ' + error);
    });
});



/*****************************************************************
      Upload de Imagem
******************************************************************/
//* dependência necessária: npm install --save multer
//   O Multer é uma biblioteca para tratar formData... 

//Mapeia o diretório de imagens 
app.use('/uploads', express.static('uploads'));

const multer = require('multer');

const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './uploads/');
  }, 
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({storage : storage});
//const upload = multer({dest: 'uploads/'}); 

//=============================================================
app.post('/api/img',upload.single('imagem') ,function (req, resp) {

  resp.json({ imagem: req.file.destination + req.file.originalname});
  console.log(req.file);


});



//https://medium.com/code-prestige/como-criar-um-app-react-consumindo-um-back-end-node-com-express-5030e1727ace
//https://daveceddia.com/create-react-app-express-backend/











