window.jsPDF = window.jspdf.jsPDF;
// Espera até que o DOM esteja pronto
document.addEventListener('DOMContentLoaded', function () {
    // Sua função exportarParaPDF() aqui
     function exportarParaPDF() {
        console.log("Exportando para PDF...");
  
        // Criar um novo documento PDF
        const doc = new jsPDF();
  
        // Adicionar conteúdo à folha de teste
        doc.text('Esta é uma folha de teste', 10, 10);
  
        // Adicionar mais conteúdo, se necessário
        // Exemplo: doc.text('Outro texto', 10, 20);
  
        // Salvar o documento PDF
        doc.save('folha_de_teste.pdf');
    }
  
    // Adicione um ouvinte de evento ao botão de exportar
    document.getElementById('btnExportarPDF').addEventListener('click', exportarParaPDF);
  });
  