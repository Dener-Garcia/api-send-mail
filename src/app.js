const express = require('express');
const cors = require('cors');
const saveFilesMidleware = require('./middlewares/upload.midleware');
const sendMailController = require("./controllers/send.mail.controller")

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/contact-amper-tech", sendMailController.contactAmperTech)
app.post("/service-order", saveFilesMidleware.saveFiles(10), sendMailController.serviceOrderAmperTech)

app.get("/", (req, res) => res.status(200).send("Api running"))

app.listen(3010, () => {
  console.log('Servidor backend online!');
});