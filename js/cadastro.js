// Função para exibir um toast usando Toastify
function exibirToast(mensagem, cor) {
    Toastify({
        text: mensagem,
        duration: 3000, // Tempo de exibição do toast em milissegundos (opcional)
        close: true,
        backgroundColor: cor // Adiciona a cor de fundo ao toast
    }).showToast();
}

// Função para tratamento do formulário
const tratarFormulario = () => {
    document.getElementById('enviar').disabled = true;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const rep_senha = document.getElementById('rep_senha');

    // Função para validar se os campos estão preenchidos
    const validarCampos = () => {
        return nome.value !== '' && email.value !== '' && senha.value !== '' && rep_senha.value !== '';
    };

    // Função para validar o campo de repetição de senha
    const validarRepeticaoSenha = () => {
        if (rep_senha.value !== senha.value) {
            rep_senha.style.backgroundColor = '#F88';
            document.getElementById("rep").innerHTML = "<b>As senhas não conferem</b>";
            rep_senha.value = "";
            return false;
        } else {
            rep_senha.style.backgroundColor = '#FFF';
            document.getElementById("rep").innerHTML = "Repita a Senha";
            return true;
        }
    };

    // Função para habilitar/desabilitar botão de envio
    const atualizarBotaoEnvio = () => {
        document.getElementById('enviar').disabled = !validarCampos() || !validarRepeticaoSenha();
    };

    // Adicionar eventos de blur para os campos do formulário
    nome.onblur = email.onblur = senha.onblur = () => {
        if (nome.value === '' || email.value === '' || senha.value === '') {
            nome.style.backgroundColor = email.style.backgroundColor = senha.style.backgroundColor = '#F88';
        } else {
            nome.style.backgroundColor = email.style.backgroundColor = senha.style.backgroundColor = '#FFF';
        }
        atualizarBotaoEnvio();
    };

    rep_senha.onblur = () => {
        validarRepeticaoSenha();
        atualizarBotaoEnvio();
    };
};

// Função para lidar com o envio do formulário
const handleSubmit = async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch(`http://localhost:3000/users/byEmail/${email.value}`);

    if (response.status === 200) {
        exibirToast('O email já existe. Por favor, escolha outro.', '#ff0000');
    } else {
        try {
            const registerResponse = await fetch('http://localhost:3000/users/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (registerResponse.status === 200) {
                document.querySelector("form").style.display = 'none';
                document.querySelector("form").reset();
                exibirToast('Cadastro realizado com sucesso.', '#00ff00');
                document.getElementById("sucesso").innerHTML = "Obrigado por se Inscrever";
            } else {
                exibirToast('Erro no cadastro. Por favor, tente novamente.', '#ff0000');
            }
        } catch (error) {
            console.error('Error:', error);
            exibirToast('Erro no cadastro. Por favor, tente novamente.', '#ff0000');
        }
    }

    document.getElementById('enviar').disabled = true;
};


// Adicionar evento de submit ao formulário
document.getElementById('cadastro').addEventListener('submit', handleSubmit);

// Chamar a função de tratamento do formulário
tratarFormulario();
