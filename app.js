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
        user: "seu-email",
        pass: "sua-senha"
    }
})

 // Configurando o envio do e-mail com os dados do formulário recebidos do front end
 const emailContent = `
 <h1>Contato via site:</h1>
 <h2>Nome: ${dadosDoFormulario.name}</h2>
 <h2>Email: ${dadosDoFormulario.mail}</h2>
 <h3>Mensagem: ${dadosDoFormulario.message}</h3>
`;

console.log("dados recebidos", dadosDoFormulario)
console.log("dados do emailContent", emailContent)

// configurando o envio do email

configSmtp.sendMail({
    from: "Form site portofolio <dener_bat@outlook.com>",
    to: "dener.criarbr@gmail.com",
    subject: "Contato via site",
    html: emailContent,
    text: `"Nome:" ${dadosDoFormulario.name}, "E-mail:" ${dadosDoFormulario.mail}, "Mensagem:" ${dadosDoFormulario.message}`
})
// mostrando erros e seu deu certo
.then((resp) => {
  console.log(resp, "Mensagem enviada com sucesso")
  res.json({ message: 'Mensagem enviada'});
})

.catch((err)=> {
console.log(err, "seu email deu erro")
res.status(500).json({ error: "Falha no envio, tente novamente 2" });
})
});

app.listen(3000, () => {
  console.log('Servidor backend online!');
});