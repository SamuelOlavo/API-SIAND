window.onload = () => {
    desabilitarBotaoEntrar();

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
function desabilitarBotaoEntrar() {
    document.getElementById('entrar').disabled = true;
}

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

    const response = await fetch('http://localhost:3000/login/', {
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
        window.location = "../html/home.html";
    } else {
        exibirToast('Usuário não cadastrado', '#ff0000');
        document.querySelector("form").reset();
    }

    desabilitarBotaoEntrar();
}   

//Login com facebook
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '361760433353788',
      cookie     : true,
      xfbml      : true,
      version    : 'v13.0'
    });
      
    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


  function loginWithFacebook() {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Usuário autorizado com sucesso!');
        getUserInfo();
      } else {
        console.log('Usuário cancelou o login ou não autorizou a aplicação.');
      }
    }, {scope: 'email'}); // Solicita permissão de acesso ao email
  }

  function getUserInfo() {
    FB.api('/me', {fields: 'id,name,email'}, function(response) {
      console.log('Informações do usuário:', response);
      // Aqui você pode enviar os dados do usuário para o seu servidor e criar uma sessão de login.
    });
  }





