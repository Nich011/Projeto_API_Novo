import express, {Request, Response} from "express";

const app = express()

app.get('/teste', (req : Request, res : Response) => {
    res.send('Teste')
})

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nicholas01**",
    database: "projeto_api"
  });

app.post('/enviar', () => {
    connection.connect(function(err:Error) {
        if (err) throw err;
        console.log("Conectado ao Banco de Dados!");
        var sql = "INSERT INTO corretores (emp_num_cnpj, name, corporate_reason, email, number, consultancy) VALUES (12345678901234, 'Teste', 'Teste Razao Social', 'teste@email.com', 111234567890, 'Teste Acessoria')";
        connection.query(sql, function (err:Error, result:any) {
          if (err) throw err;
          console.log("Cadastro adicionado.");
        });
      });
})


app.listen(3000, () => console.log('Servidor iniciado na porta 3000'))

export default app;