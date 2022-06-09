const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs'); // pacote files do node.js

// Definição do endereço url ( é o mesmo que local host)
const hostname = '127.0.0.1';
const port = 3000;


// Implementação da regra de negócio
const server = http.createServer((req, res) => {  

var resposta;
const urlparse = url.parse(req.url, true);
// receber informações do usuario
const params = queryString.parse(urlparse.search); 

// criar um usuario - atualizar usuário
if(urlparse.pathname == '/criar-atualizar-usuario'){

  // salvar as informações
  fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
    if (err) throw err;
    console.log('Saved!');

    resposta = 'Usuario criado/atualizado com sucesso';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
  });    
}
// selecionar usuario
else if(urlparse.pathname == '/selecionar-usuario'){
  fs.readFile('users/' + params.id + '.txt', function(err, data) {      
    resposta = data;     

    res.statusCode = 200;   
    res.setHeader('Content-Type', 'application/json');
    res.end(resposta);
  });
}
// remover usuario
else if(urlparse.pathname == '/remover-usuario'){  
    fs.unlink('users/' + params.id + '.txt', function (err) {      
      console.log('File deleted!');
      
    resposta = err ? "Usuario nao encontrado" : "Usuario removido com sucesso";
      
    res.statusCode = 200;        
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);   
  });
}
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//criar usuario/atualizar
// http://localhost:3000/criar-atualizar-usuario?nome=clayton&idade=40&id=1

//buscar usuario
// http://localhost:3000/selecionar-usuario?id=1

//remover usuario
// http://localhost:3000/remover-usuario?id=1