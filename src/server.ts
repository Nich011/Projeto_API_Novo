import express, {Request, Response} from "express";

const app = express()

app.get('/teste', (req : Request, res : Response) => {
    res.send('Teste de funcionamento da API')
})

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nicholas01**",
    database: "projeto_api"
});

app.use(express.urlencoded({ extended: true }));

app.post('/enviar', (req: Request, res: Response) => {
    connection.connect(function(err:Error) {
        if (err) throw err;
        console.log("Conectado ao Banco de Dados!");

        let emp_num_cnpj : unknown = req.body.emp_num_cnpj
        let name : unknown = req.body.name
        let corporate_reason : unknown = req.body.corporate_reason
        let email : unknown = req.body.email
        let number : unknown = req.body.number
        let consultancy : unknown = req.body.consultancy

        var sql = `INSERT INTO corretores (emp_num_cnpj, name, corporate_reason, email, number, consultancy) VALUES (${emp_num_cnpj}, ${name}, ${corporate_reason}, ${email}, ${number}, ${consultancy})`;
        connection.query(sql, function (err:Error) {
          if (err) throw err;
          console.log("Cadastro adicionado:");
        });

        res.send(`O Cadastro com CNPJ ${emp_num_cnpj} foi adicionado com sucesso.`);
    });
})

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'))