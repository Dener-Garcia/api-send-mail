const smtpEmail = require("../helpers/nodemailer.config")
const dotenv = require('dotenv')
const { dateNow } = require("../utils/getData")
const ramdomNumber = require("../utils/generatorRamdonNumber")
const { deleteUploadedFiles } = require("../helpers/clearFiles")

dotenv.config()

async function serviceOrderAmperTech (fields, files){

    let filesAttachments = []

    const services = Array.isArray(fields.service) ? fields.service : [fields.service];
const serviceValues = Array.isArray(fields.serviceValue) ? fields.serviceValue : [fields.serviceValue];


// 🧮 CALCULAR TOTAL
const totalInCents = serviceValues.reduce((acc, curr) => {
    // Remove R$, ponto e vírgula, ex: "R$ 2.342,34" → "234234"
    const numeric = curr.replace(/\D/g, '');
    const value = parseInt(numeric, 10) || 0;
    return acc + value;
  }, 0);
  
  // Converte para real
  const totalFormatted = (totalInCents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });


    try {
        
        let tableServices = ``

        for(let index = 0; index < fields.service.length; index ++){

            let rowService = `
            <tr style="border-bottom: solid 2px #bbbec4;">
                <td style="color: #2C2A26; font-size: 1rem; text-align: start; padding: 0.5rem">Item ${index + 1}</td>
                <td style="color: #2C2A26; font-size: 1rem; text-align: start; padding: 0.5rem">${services[index]}</td>
                <td style="color: #2C2A26; font-size: 1rem; text-align: start; padding: 0.5rem">${serviceValues[index]}</td>
            </tr>
            `
            tableServices += rowService
        }

      const idOrder = ramdomNumber()

        let orderTable = `
                <div style="background-color: #f2b10d; padding: 2rem;">

        <h2 style="color: #161513; text-align: center; font-size: 1.5rem;">Orçamento <span>${idOrder}</span></h2>
        </div>

         <table style="max-width: 40rem; margin: auto; margin-top: 2rem; border-collapse: collapse">

        <thead>

            <tr style="background-color: #f6f5f4; font-size: 1.5rem">
                <th colspan="3" style="padding: 0.5rem;">Informações do cliente</th>
            </tr>

            <tr>
                <th style="color: #58544b; font-size: 1rem; text-align: start; padding: 0.5rem">Nome</th>
                <td colspan="2" style="color: #030303">${fields.name}</td>
            </tr>

            <tr>
                <th style="color: #58544b; font-size: 1rem; text-align: start; padding: 0.5rem">E-mail</th>
                <td colspan="2" style="color: #030303">${fields.mail}</td>
            </tr>

            <tr style="margin-bottom: solid 2px #58544b;">
                <th style="color: #58544b; font-size: 1rem; text-align: start; padding: 0.5rem">Telefone</th>
                <td colspan="2" style="color: #030303">${fields.phone}</td>
            </tr>

        </thead>

        <tbody>
          <tr style="background-color: #f6f5f4; font-size: 1.5rem;">

            <th style="color: #58544b; font-size: 1rem; text-align: start; padding: 0.5rem">Item</th>

            <th style="color: #58544b; font-size: 1rem; text-align: start; padding: 0.5rem">Descrição</th>

            <th style="color: #58544b; font-size: 1rem; text-align: start; padding: 0.5rem">Valor</th>

          </tr>

          ${tableServices}

          <tr>
            <th colspan="2" style="color: #58544b; text-align: end; font-size: 1.5rem; padding: 1rem;">Total</th>
            <td style="color: #58544b; font-size: 1.5rem; text-align: end;">${totalFormatted}</td>
          </tr>
        </tbody>
        <tfoot>
            <tr>
                <th colspan="2" style="color: #989ba0; font-size: 1rem; text-align: start; padding: 0.5rem">Data orçamento</th>
                <td style="color: #989ba0; font-size: 1rem; text-align: start; padding: 0.5rem">${dateNow}</td>
            </tr>
        </tfoot>
    </table>
        `

    filesAttachments = files.map(file => ({
        filename: file.originalname,
        path: file.path
    }));
console.log(filesAttachments)

       const emailAuth = smtpEmail.nodemailerConfig(
            process.env.CRIARBR_LOGIN, 
            process.env.CRIARBR_PASSWORD
        )

      const emailOptions = smtpEmail.nodemailerEmailOptions(
        `Amper Tech <${process.env.CRIARBR_LOGIN}>`,
            fields.mail,
            null,
            `Orçamento Amper Tech - ${idOrder}`,
            orderTable,
            filesAttachments
        )

        const response = await emailAuth.sendMail(emailOptions);

        await deleteUploadedFiles(files)
        
        console.log("chegou controler", files, "meus arquivos", filesAttachments)
        return response
    } catch (error) {
        await deleteUploadedFiles(filesAttachments)
        throw error
    }
}

module.exports = {
    serviceOrderAmperTech
}