const data = new Date(); // Cria um objeto Date com a data e hora atual

const dateNow = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo', // Define o fuso horário fixo
  year: 'numeric', // Exibe o ano
  month: '2-digit', // Exibe o mês com 2 dígitos
  day: '2-digit', // Exibe o dia com 2 dígitos
  hour: '2-digit', // Exibe a hora com 2 dígitos
  minute: '2-digit', // Exibe os minutos com 2 dígitos
  second: '2-digit' // Exibe os segundos com 2 dígitos
}).format(data);

console.log(dateNow); // Exemplo: "12/07/2025 14:30:12"

module.exports = {
    dateNow
}