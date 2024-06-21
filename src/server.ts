import express, {Request, Response} from "express"; // Framework usado para criação da API

const app = express() // A constante app será o controlador da API.

// Primeira requisição de teste, retornando apenas uma mensagem simples.
app.get('/teste', (req : Request, res : Response) => {
    res.send('Teste de funcionamento da API')
})

// Importa o módulo do mysql para Node usando a função require. (Que funciona quase como um import)
var mysql = require('mysql');

// Cria a conexão com o mysql conectando através de uma conta e da indicação da database a ser utilizada.
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nicholas01**",
    database: "projeto_api"
});

//Permite que a API receba e leia o corpo das requisições como JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Requisição POST que faz com que a API conecte no banco de dados e adicione um novo "cadastro" na tabela indicada.
app.post('/enviar', (req: Request, res: Response) => {
    connection.connect(function(err:Error) {
        if (err) throw err;
        console.log("Conectado ao Banco de Dados!");

        // Define variáveis para cada uma das informações contidas no corpo da requisição.
        let emp_num_cnpj : unknown = req.body.emp_num_cnpj
        let name : unknown = req.body.name
        let corporate_reason : unknown = req.body.corporate_reason
        let email : unknown = req.body.email
        let number : unknown = req.body.number
        let consultancy : unknown = req.body.consultancy

        // O comando SQL em si
        var sql = `INSERT INTO corretores (emp_num_cnpj, name, corporate_reason, email, number, consultancy) VALUES (${emp_num_cnpj}, ${name}, ${corporate_reason}, ${email}, ${number}, ${consultancy})`;

        // Executa o comando SQL
        connection.query(sql, function (err:Error) {
          if (err) throw err;
          console.log("Cadastro adicionado:");
        });

        // Resposta indicando que o cadastro foi um sucesso.
        res.send(`O Cadastro com CNPJ ${emp_num_cnpj} foi adicionado com sucesso.`);
    });
})

// Define a porta 3000 como a porta onde o servidor espera as requisições.
app.listen(3000, () => console.log('Enviar requisições pela porta 3000'))