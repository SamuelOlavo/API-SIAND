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

  // Selecionar todos os cards de agendamento
  const cards = document.querySelectorAll('.card');

  // Iterar sobre os agendamentos exibidos na tela, pulando o primeiro registro
  for (let i = 1; i < cards.length; i++) {
      const card = cards[i];
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
  }

  // Salvar o documento PDF
  doc.save('agendamentos.pdf');
  exibirToast("Download realizado com sucesso", "#4CAF50");
  doc.save('Agendamentos_' + Esteticista);
  exibirToast("Download realizado", "#4CAF50");

}

// Adicionar um ouvinte de evento ao botão de exportar
document.getElementById('btnExportarPDF').addEventListener('click', exportarAgendamentosParaPDF);
