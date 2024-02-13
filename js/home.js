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

window.onload = function() {
    exibirToast('Bem vindo','#269934');
    preenchergrid(Esteticista);
    console.log(user);
    console.log(adm);
    
}

    let user = JSON.parse(localStorage.getItem("user_nome"));
    let Esteticista = user;

    var userAdm = JSON.parse(localStorage.getItem('user_adm'));
    if (userAdm) {
    document.getElementById('userAdmStatus').textContent = 'O usuário é um administrador.';
    } else {
    document.getElementById('userAdmStatus').textContent = 'O usuário não é um administrador.';
    }
   
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    let partes = today.split("-");
    let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];    
    console.log(hoje);

    const msg_agenda = document.getElementById("msg_agenda");
    const numer = document.getElementById("numer");

    async function preenchergrid(Esteticista) {
        const response = await fetch(`http://localhost:3000/agenda/servicos/${Esteticista}`
        , {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Data: hoje})
        });
    
        if (response.status === 500) {
            exibirToast('Erro servidor', '#ff0000');
            return;
        } 
        const dados = await response.json(); 
    
        if (!dados || dados.length === 0) {
            // exibirToast('Você não possui agendamentos para hoje.', '#ff0000');
        } else {  
            msg_agenda.innerHTML += `  Você possui ${dados.length} agendamento(s) para o dia de hoje.`; 
            numer.innerHTML += `${dados.length}`;
        }
    }
    
