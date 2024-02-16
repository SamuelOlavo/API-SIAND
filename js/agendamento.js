// Função para executar as ações ao carregar a página
window.onload = () => {
    exibirToast("Bem vindo! Faça seu agendamento", "green");
    carregarServicos();
    configurarEventListeners();
};

// Função para exibir o toast
function exibirToast(mensagem, cor) {
    Toastify({
        text: mensagem,
        duration: 3000,
        close: true,
        style: { background: cor }
    }).showToast();
}

// Função para carregar os serviços
async function carregarServicos() {
    try {
        const response = await fetch(`http://localhost:3000/servicos/servicos`);
        if (response.status === 200) {
            const data = await response.json();
            preencherDropdownServicos(data);
        } else {
            throw new Error('Erro de busca');
        }
    } catch (error) {
        console.log(error);
    }
}



// Função para preencher o dropdown de serviços
function preencherDropdownServicos(data) {
    const list_serv = [...new Set(data.map(serv => serv.Servicos))];
    const select = document.getElementById("serv");
    select.innerHTML = '';

    list_serv.forEach(servicos => {
        const option = document.createElement('option');
        option.text = servicos;
        select.appendChild(option);
    });
}

// Função para carregar os esteticistas
async function carregarEsteticistas(servicoSelecionado) {
    try {
        const response = await fetch(`http://localhost:3000/servicos/servico/${servicoSelecionado}`);
        if (response.status === 200) {
            const data = await response.json();
            return [...new Set(data.map(prof => prof.Esteticista))];
        } else {
            throw new Error('Erro de busca');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para preencher o dropdown de esteticistas
function preencherDropdownEsteticistas(esteticistas) {
    const select = document.getElementById("prof");
    select.innerHTML = '';
    esteticistas.forEach(esteticista => {
        const option = document.createElement('option');
        option.text = esteticista;
        select.appendChild(option);
    });
}

// Event listener para carregar os esteticistas quando o serviço é selecionado
document.getElementById('serv').addEventListener('change', async () => {
    const servicoSelecionado = document.getElementById('serv').value;
    const esteticistas = await carregarEsteticistas(servicoSelecionado);
    if (esteticistas) {
        preencherDropdownEsteticistas(esteticistas);
    }
});

// Função para configurar os event listeners
function configurarEventListeners() {
    document.getElementById('tel').addEventListener('blur', validarCampo);
    document.getElementById('date').addEventListener('blur', validarCampo);
    document.getElementById('dateNas').addEventListener('blur', validarCampo);
    document.getElementById('hora').addEventListener('blur', validarCampo);
    document.getElementById('prof').addEventListener('blur', validarCampo);
}

// Função para validar campos
function validarCampo(event) {
    const campo = event.target;
    if (campo.value === '') {
        campo.style.backgroundColor = '#F88';
    } else {
        campo.style.backgroundColor = '#FFF';
    }
}


    const handleSubmit = async (event) => {
        event.preventDefault();  
        const data = document.getElementById('date').value;
        let partes = data.split('-');
        let dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];

        const dataNas = document.getElementById('dateNas').value;
        let traco = dataNas.split('-');
        let dataNasFormatada = traco[2] + '/' + traco[1] + '/' + traco[0];
                      

        const NomeCliente = document.querySelector('input[name=nome]').value;
        const DataNascimento = dataNasFormatada;
        const Telefone = document.querySelector('input[name=tel]').value;        
        const Esteticista = document.getElementById('prof').value;  
        const Servicos = document.getElementById('serv').value;
        const Data = dataFormatada;
        const Horario = document.getElementById('hora').value;

        try {
            const response = await fetch('http://localhost:3000/agenda/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ NomeCliente , DataNascimento, Telefone , Esteticista , Servicos , Data ,  Horario }),
            }); 
            if (response.status === 201) {
                exibirToast('Agendamento realizado com sucesso.', '#269934');
                console.log(response);
                document.querySelector("form").reset();  
            } else {
                exibirToast('Favor preencher todos os campos do formulario.', '#ff0000');
                console.log(response);
            }
        } catch (error) {
            console.error('Error:', error);
            exibirToast('Erro no cadastro. Por favor, tente novamente.', '#ff0000');
        }        
   
    };
document.getElementById('agendamento').addEventListener('submit', handleSubmit);    
