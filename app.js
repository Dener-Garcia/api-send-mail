
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para fazer o parse de requisições com conteúdo JSON

// Rota para receber os dados do formulário
app.post('/enviar-email', (req, res) => {
  const dadosDoFormulario = req.body;


  const configSmtp = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    secure: false, // true for 465 else false for others
    auth: {
        user: "seu email source",
        pass: "senha de login"
    }
})

 // Configurando o envio do e-mail com os dados do formulário
 const emailContent = `
 <h1>Dados do formulário recebidos:</h1>
 <p>Nome: ${dadosDoFormulario.name}</p>
 <p>Email: ${dadosDoFormulario.mail}</p>
 <p>Mensagem: ${dadosDoFormulario.message}</p>
`;

console.log("dados recebidos", dadosDoFormulario)
console.log("dados do emailContent", emailContent)

// configurando o envio do email

configSmtp.sendMail({
    from: "de quem eh o email <dener_bat@outlook.com>",
    to: "denerag91@gmail.com",
    subject: "Assunto do email",
    html: emailContent,
    text: 'Caso o email nao renderize o html sera mostrado esse texto'
})
// mostrando erros e seu deu certo
.then((resp) => {
  console.log(resp, "email foi enviado")
  res.json({ message: 'Dados do formulário recebidos com sucesso no servidor, essa eh uma resposta dele!' });
})

.catch((err)=> {
console.log(err, "seu email deu erro")
res.status(500).json({ error: 'Erro ao enviar o email.' });
})
});

app.listen(3000, () => {
  console.log('Servidor backend online: http://192.177.234.11:3000');
});