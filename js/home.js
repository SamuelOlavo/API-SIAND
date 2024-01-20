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
onload = () => {
    exibirToast('Bem vindo','#269934')
}