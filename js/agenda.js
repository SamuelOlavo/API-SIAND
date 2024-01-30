onload = () => {
  function exibirToast(mensagem, cor) {
    Toastify({
      text: mensagem,
      duration: 3000, // Tempo de exibição do toast em milissegundos (opcional)
      close: true,
      style: {
        background: cor,
      },
    }).showToast();
  }

  let user = JSON.parse(localStorage.getItem("data"));
  let Esteticista = user.nome;
  document.getElementById("nome").value = Esteticista;


  var now = new Date();


 var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
  let partes = today.split("-");
  let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];
  document.getElementById("data").value = today;
   
  console.log(today);

  bt_busca.onclick = () => {
    preenchergrid(Esteticista);    
  };

  const grid = document.getElementById("grid_list");

  async function preenchergrid(Esteticista) {
    const data = document.getElementById('data').value;
    let partes = data.split('-');
    let dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];       
    const response = await fetch(`http://localhost:3000/agenda/servicos/${Esteticista}`
    , {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Data: dataFormatada})
    });

    if (response.status === 500) {
        exibirToast('Erro servidor', '#ff0000');
        return;
    } else if (response.status === 400) {
        exibirToast('Verifique os campos e refaça a busca', '#ff0000');
        return;
    }
    const dados = await response.json(); 

    if (!dados || dados.length === 0) {
        exibirToast('Não há agendamentos para este dia.', '#ff0000');
    } else {
         // Acessar o tbody pelo id
         let grid = document.getElementById('grid_list');
         // Limpar o conteúdo atual do tbody
         grid_list.innerHTML = ''; 
                         
         // Iterar sobre os dados e adicionar novas linhas ao tbody
         dados.forEach((item, index) => {
          let card = document.createElement('div');
          card.className = 'card mb-1';
          card.innerHTML = `
              <div class="card-body">
                  <h6 class="card-title">${index + 1} - ${item.Data} | ${item.Horario} - ${item.Servicos} </h6>
                  <p class="card-text"><b>Cliente:</b> ${item.NomeCliente} | <b>Data de nascimento:</b> ${item.DataNascimento} | <b>Tel:</b> ${item.Telefone} </p>
              </div>
          `;
          card.addEventListener('click', () => {
              abrirFormularioDeEdicao(item);
          });
          grid_list.appendChild(card);
      });
      
         exibirToast('lista de agendamentos atualizada.', '#269934');

        
    }
}


function abrirFormularioDeEdicao(item) {
  // Abra o formulário de edição
  let formulario = document.getElementById('formulario_de_edicao');
  formulario.style.display = 'block';

  // Preencha os campos do formulário com os dados do item
  document.getElementById('NomeCliente').value = item.NomeCliente;  
  document.getElementById('tel').value = item.Telefone;
  document.getElementById('serv').value = item.Servicos;
  document.getElementById('prof').value = item.Esteticista;
  document.getElementById('date').value = item.Data;
  document.getElementById('hora').value = item.Horario
  // ... preencha os outros campos ...

  // Adicione um evento de clique ao botão de salvar
  document.getElementById('botao_salvar').addEventListener('click', () => {
      salvarEdicoes(item._id);
  });
}

async function salvarEdicoes(id) {
  // Pegue os dados editados do formulário
  let NomeCliente = document.getElementById('NomeCliente').value;
  let DataNascimento = document.getElementById('DataNascimento').value;
  let Telefone = document.getElementById('Telefone').value;
  // ... pegue os outros campos ...

  // Faça uma requisição PUT para atualizar o item no servidor
  const response = await fetch(`http://localhost:3000/agenda/servicos/${id}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          NomeCliente: NomeCliente,
          DataNascimento: DataNascimento,
          Telefone: Telefone,
          // ... outros campos ...
      })
  });

  if (response.ok) {
      exibirToast('Agendamento atualizado com sucesso.', '#269934');
  } else {
      exibirToast('Erro ao atualizar agendamento.', '#ff0000');
  }
}



  // fetch(`http://localhost:3000/agenda/servicos/${serv}`)
  // .then(response => response.json())
  // .then(data => {
  //     const list_prof = [...new Set(data.map(prof => prof.Esteticista))];
  //     console.log(list_prof);
  //     // O elemento select é obtido pelo seu id
  //     const select = document.getElementById("prof");
  //     // Limpa as opções existentes
  //     select.innerHTML = '';
  //     // Para cada esteticista na lista, uma nova opção é criada e adicionada ao select
  //     list_prof.forEach(esteticista => {
  //         const option = document.createElement('option');
  //         option.text = esteticista;
  //         select.appendChild(option);
  //     });
  // })
  // .catch((erro) => {
  //     console.error('Erro:', erro);
  // });
};
