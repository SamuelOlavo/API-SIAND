window.jsPDF = window.jspdf.jsPDF;

// Função para exportar os agendamentos para PDF
function exportarAgendamentosParaPDF() {
  // Criar um novo documento PDF
  const doc = new jsPDF();

  // Título do documento
  doc.setFontSize(20);
  doc.text('Agendamentos', 10, 20);

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
      doc.text(descricao, 10, y + 10);

      // Adicionar uma linha para separar os agendamentos
      doc.setLineWidth(0.5);
      doc.line(10, y + 15, 200, y + 15);

      // Atualizar a posição Y para o próximo agendamento
      y += 20;
  });

  // Salvar o documento PDF
  doc.save('agendamentos.pdf');
}

// Adicionar um ouvinte de evento ao botão de exportar
document.getElementById('btnExportarPDF').addEventListener('click', exportarAgendamentosParaPDF);
