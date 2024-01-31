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
          card.className = 'card mb-2';
          let anotacoes = item.Anotacoes !== undefined ? item.Anotacoes : '';
          let remarcar = item.Remarcar ? 'sim' : '';

          card.innerHTML = `
              <div class="list card-body" id="list">
                  <h6 class="card-title">${index + 1} - ${item.Data} | ${item.Horario} - ${item.Servicos} | Remarcar - ${remarcar}</h6>
                  <p class="card-text"><b>Cliente:</b> ${item.NomeCliente} | <b>Data de nascimento:</b> ${item.DataNascimento} | <b>Tel:</b> ${item.Telefone} <br>
                  <b>Anotaçoes:</b> ${anotacoes} </p>                 
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
  // Obtenha o corpo do modal
  let modalBody = document.querySelector('#editModal .modal-body');  
  // Limpe o corpo do modal
  modalBody.innerHTML = '';  
  // Crie campos de entrada para cada propriedade do item
  for (let key in item) {
      // Ignore os campos _id e __v
      if (key === '_id' || key === '__v') continue;
      
      let div = document.createElement('div');
      div.className = 'form-group';      
      let label = document.createElement('label');
      label.for = key;
      label.innerText = key;
      
      let input = document.createElement('input');
      input.id = key;
      input.value = item[key];
      input.className = 'form-control';
      if (key === 'Esteticista') {
        input.readOnly = true;        
    }      
      div.appendChild(label);
      div.appendChild(input);
      modalBody.appendChild(div);
  }
  // Adicione os novos campos "REMARCAR" e "ANOTAÇÕES" se eles não existirem
  let camposExtras = ['Anotacoes', 'Remarcar'];
  for (let campo of camposExtras) {
      if (!item.hasOwnProperty(campo)) {
          let div = document.createElement('div');
          div.className = 'form-group';
          
          let label = document.createElement('label');
          label.for = campo;
          label.innerText = campo;
          
          let input;
          if (campo === 'Remarcar') {
              input = document.createElement('input');
              input.type = 'checkbox';
              input.checked = item.Remarcar; // Define o estado do checkbox com base no valor de Remarcar
          } else {
              input = document.createElement('input');
              input.type = 'text';
          }
          input.id = campo;
          input.className = 'form-control';
          
          div.appendChild(label);
          div.appendChild(input);
          modalBody.appendChild(div);
      }
  }
  
  
  // Adicione um manipulador de eventos ao botão de salvar
  document.getElementById('saveButton').addEventListener('click', () => {
      for (let key in item) {
          // Não atualize os campos _id e __v
          if (key !== '_id' && key !== '__v') {
              item[key] = document.getElementById(key).value;
          }
      }
      // Atualize a interface do usuário aqui
      // Feche o modal após a edição
      $('#editModal').modal('hide');
  });
  
  // Mostre o modal
  $('#editModal').modal('show');
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
        // Bloqueie a edição do campo ID
      //   if (key === '_id' || key === '__v' || key === 'Esteticista') {
      //     input.readOnly = true;
      //     label.readOnly = true;
          
      // }
  // });
};
