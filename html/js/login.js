import { URL_TESTE } from './app.js';

window.onload = () => {
    // desabilitarBotaoEntrar();

    // Eventos de blur para os campos de email e senha
    email.onblur = verificarFormulario;
    senha.onblur = verificarFormulario;

    // Adiciona o manipulador de envio do formulário
    document.getElementById('login').addEventListener('submit', handleSubmit);

}


// Função para exibir um toast usando Toastify
function exibirToast(mensagem, cor) {
    Toastify({
        text: mensagem,
        duration: 3000,
        close: true,
        style: {
            background: cor,
        }
    }).showToast();
}

// Função para desabilitar o botão de entrar
// function desabilitarBotaoEntrar() {
//     document.getElementById('entrar').disabled = true;
// }

// Função para verificar se o formulário está válido
function verificarFormulario() {
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();

    const emailValido = emailValue !== '';
    const senhaValida = senhaValue !== '';

    if (emailValido && senhaValida) {
        entrar.disabled = false;
    } else {
        entrar.disabled = true;
    }

    email.style.backgroundColor = emailValido ? '#FFF' : '#F88';
    senha.style.backgroundColor = senhaValida ? '#FFF' : '#F88';
}

// Função para manipular o envio do formulário
async function handleSubmit(event) {
    event.preventDefault();

    const emailValue = document.getElementById('email').value;
    const senhaValue = document.getElementById('senha').value;

    const response = await fetch(`${URL_TESTE}/login/`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, senha: senhaValue }),
    });

    if (response.status === 200) {
        const data = await response.json();  
        console.log(data); // Verifique o que está dentro de 'data'
        console.log(data.user); // Verifique o que está dentro de 'data.user'
        console.log(data.user.Administrador); // Verifique o valor de 'data.user.Administrador'

        let userAdm = Boolean(data?.user?.Administrador) ? 1 : 0;
        sessionStorage.setItem('user_adm', JSON.stringify(userAdm));
        

        sessionStorage.setItem('user_email', JSON.stringify(data.user.email));    
        sessionStorage.setItem('user_nome', JSON.stringify(data.user.nome));    
        sessionStorage.setItem('user_token', JSON.stringify(data.token));
        window.location = "./home.html";
    } else {
        exibirToast('Usuário não cadastrado', '#ff0000');
        document.querySelector("form").reset();
    }
    // desabilitarBotaoEntrar();
}

