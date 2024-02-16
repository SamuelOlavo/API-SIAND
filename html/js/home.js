import { URL_TESTE } from './app.js';
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

    let user = JSON.parse(sessionStorage.getItem("user_nome"));
    let Esteticista = user;

   
   
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    let partes = today.split("-");
    let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];    
    console.log(hoje);
    document.getElementById('userStatus').textContent = 'USER: ' + user ; 
    document.getElementById('dia').textContent = '' + hoje ; 

    document.getElementById('sair').addEventListener('click', function() {
        sessionStorage.clear();
        window.location = "../html/login.html";
    });
        

    const msg_agenda = document.getElementById("msg_agenda");
    const numer = document.getElementById("numer");

    async function preenchergrid(Esteticista) {
        const response = await fetch(`${URL_TESTE}/agenda/servicos/${Esteticista}`
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
    
