import { URL_TESTE } from './app.js';

window.onload = () => {
    // desabilitarBotaoEntrar();

    // Eventos de blur para os campos de email e senha
    email.onblur = verificarFormulario;
    senha.onblur = verificarFormulario;

    // Adiciona o manipulador de envio do formulário
    document.getElementById('login').addEventListener('submit', handleSubmit);

    const clientID = "771987966504-vri95o8gkbvprv8rc3l4d1c30jfjhc0i.apps.googleusercontent.com";

    google.accounts.id.initialize({
      client_id: clientID,
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("loginGoogle"), {
      theme: "filled_black",
      size: "large",
      type: "standard",
      shape: "pill",
      locale: "pt-BR",
      logo_alignment: "left",
    });
  
    google.accounts.id.prompt(); // also display the One Tap dialog

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

function handleCredentialResponse(response) {
    const idToken = response.credential;
  
    fetch(`http://localhost:3000/login/authGoogle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }), // Enviar apenas o token
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para o backend');
      }
      return response.json();
    })
    .then((data) => {
        // Se o email não estiver verificado, exibir uma mensagem de erro
        if (data.error === 'Email não verificado') {
            exibirToast('Seu email não foi verificado. Verifique seu email antes de continuar.', '#ff0000');
            return;
        }
        // Verifica se há uma URL de redirecionamento na resposta
        if (data.error === 'Usuário já cadastrado') {
            window.location = "./login.html";
            
        }
        if (data.error === 'sub ou email não encontrado') {
            exibirToast('Erro ao cadastrar o usuário', '#ff0000');
            return;
        }
    })
    .catch((error) => {
        console.error('Erro:', error.message);
    });
  }

