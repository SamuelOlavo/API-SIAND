// Função para exibir um toast usando Toastify
function exibirToast(mensagem, cor) {
  Toastify({
      text: mensagem,
      duration: 3000, // Tempo de exibição do toast em milissegundos (opcional)
      close: true,
      style: {
          background: cor,
      }
  }).showToast();
}

window.jsPDF = window.jspdf.jsPDF;

// Função para exportar os agendamentos para PDF
function exportarAgendamentosParaPDF() {
  // Criar um novo documento PDF
  const doc = new jsPDF();

  // Título do documento
  const Esteticista = document.getElementById("nome").value;
  doc.setFontSize(20);
  doc.text('Agendamentos - ' + Esteticista, 10, 20);

  // Posição inicial para desenhar os agendamentos
  let y = 30;

  // Iterar sobre os agendamentos exibidos na tela
  document.querySelectorAll('.card').forEach(card => {
      // Extrair informações do card
      const titulo = card.querySelector('.card-title').innerText;
      const descricao = card.querySelector('.card-text').innerText;

      // Adicionar informações ao PDF
      doc.setFontSize(12);
      doc.text(titulo, 10, y);
      doc.setFontSize(10);
      doc.text(descricao, 10, y + 5);

      // Adicionar uma linha para separar os agendamentos
      doc.setLineWidth(0.5);
      doc.line(10, y + 15, 200, y + 15);

      // Atualizar a posição Y para o próximo agendamento
      y += 20;
  });

  // Salvar o documento PDF
  doc.save('agendamentos.pdf');
  exibirToast("Download realizado com", "#4CAF50");

}

// Adicionar um ouvinte de evento ao botão de exportar
document.getElementById('btnExportarPDF').addEventListener('click', exportarAgendamentosParaPDF);


// Obrigado pela imagem, ela esclarece o problema. Parece que o primeiro agendamento está sendo duplicado no PDF gerado. Isso pode estar acontecendo devido a várias razões. Aqui estão algumas possíveis causas:

// Dados duplicados: Verifique se os dados que estão sendo usados para gerar o PDF não têm o primeiro agendamento duplicado. Você pode fazer isso imprimindo os dados antes de gerar o PDF.
// Chamadas de função duplicadas: Certifique-se de que a função que gera o PDF não está sendo chamada duas vezes inadvertidamente.
// Problemas de sincronização: Se você estiver gerando o PDF em resposta a algum evento assíncrono (como uma chamada de API), pode haver condições de corrida que resultam na duplicação do primeiro agendamento.
// Problemas com a biblioteca PDF: Pode haver um bug na biblioteca que você está usando para gerar o PDF que está causando a duplicação.
// Para ajudar a solucionar o problema, você pode tentar adicionar algumas declarações de log em seu código para ver onde exatamente a duplicação está ocorrendo. Por exemplo, você pode registrar os dados antes de gerar o PDF, e também registrar cada agendamento à medida que é adicionado ao PDF.

// Espero que isso ajude a solucionar o problema! Se você tiver mais perguntas ou precisar de mais ajuda, fique à vontade para perguntar.