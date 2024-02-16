import { URL_TESTE } from './app.js';


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
  //Pegando os dados de login do Usuario
  let user = JSON.parse(sessionStorage.getItem("user_nome"));

  //Setando a data de hoje no campo de busca
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
  let partes = today.split("-");
  let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];
  document.getElementById("data").value = today;

  document.getElementById("userStatus").textContent = "USER: " + user;
  document.getElementById("dia").textContent = "" + hoje;

  //botao de SAIR
  document.getElementById("sair").addEventListener("click", function () {
    sessionStorage.clear();
    window.location = "./html/login.html";
  });

  trataAdm = async () => {
    let adm = JSON.parse(sessionStorage.getItem("user_adm"));
    if (adm == 1) {
      document.getElementById("nome").disabled = false;
      const select = document.getElementById("nome");
      let user = JSON.parse(sessionStorage.getItem("user_nome"));
      if (user) {
        let option = document.createElement("option");
        option.value = user;
        option.text = user;
        select.appendChild(option);
      }
      fetch(`${URL_TESTE}/agenda/`)
        .then((response) => response.json())
        .then((data) => {
          let uniqueNames = [...new Set(data.map((item) => item.Esteticista))];
          // Use os nomes únicos para preencher o elemento select
          uniqueNames.forEach((name) => {
            // Se o nome já não foi adicionado (como o nome do usuário da sessão), adicione-o
            if (name !== user) {
              let option = document.createElement("option");
              option.value = name;
              option.text = name;
              select.appendChild(option);
            }
          });
        })
        .catch((error) => console.error("Erro:", error));
    } else {
      let user_nome = JSON.parse(sessionStorage.getItem("user_nome"));
      document.getElementById("nome").value = user_nome;
      var option = document.createElement("option");
      option.text = user_nome;
      option.value = user_nome;
      var select = document.getElementById("nome");
      select.add(option);
      select.value = user_nome;
      Esteticista = user_nome;
    }
  };
  trataAdm();

  //Função para tratar a função de buscar todos agendamentos;
  const checkbox = document.getElementById("todos");
  const campodata = document.getElementById("data");
  checkbox.onclick = () => {
    if (checkbox.checked) {
      campodata.value = "yyyy-MM-dd";
      campodata.disabled = true;
    } else {
      campodata.disabled = false;
      document.getElementById("data").value = today;
    }
  };

  //Botao de busca chama a função para preencher com os agendamentos.
  bt_busca.onclick = () => {
    let grid = document.getElementById("grid_list");
    grid.innerHTML = "";
    preenchergrid();
  };

  //Função que passa o nome da esteticista e a data escolhida no input
  async function preenchergrid() {
    const Esteticista = document.getElementById("nome").value;
    //Paramentro para formatar a data antes da consulta
    const data = document.getElementById("data").value;
    let partes = data.split("-");
    let dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];

    const checkbox = document.getElementById("todos");
    if (checkbox.checked) {
      var response = await fetch(
        `${URL_TESTE}/agenda?Esteticista=${Esteticista}`,
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      var response = await fetch(
        `${URL_TESTE}/agenda/servicos/${Esteticista}`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Data: dataFormatada }),
        }
      );
    }
    if (response.status === 500) {
      exibirToast("Erro servidor", "#ff0000");
      return;
    } else if (response.status === 400) {
      exibirToast("Verifique os campos e refaça a busca", "#ff0000");
      return;
    }
    //Armazeno os dados de retornor para construir a lista de agendamentos
    const dados = await response.json();
    if (!dados || dados.length === 0) {
      exibirToast("Não há agendamentos para este dia.", "#ff0000");
    } else {
      let grid = document.getElementById("grid_list");
      grid.innerHTML = "";
      // Iterar sobre os dados e adicionar novas linhas ao grid
      dados.forEach((item, index) => {
        let card = document.createElement("div");
        card.className = "card mb-2 mt-2";
        let anotacoes = item.Anotacoes !== undefined ? item.Anotacoes : "";
        let remarcar = item.Remarcar !== undefined ? item.Remarcar : "";
        card.innerHTML = `          
              <div class="list card-body" id="list"> 
                  <h6 class="card-title">${index + 1} | ${item.Data} - ${
          item.Horario
        } | ${item.Servicos} | Remarcar: ${remarcar}</h6>
                  <p class="card-text"><b>Cliente:</b> ${
                    item.NomeCliente
                  } | <b>Data de nascimento:</b> ${
          item.DataNascimento
        } | <b>Tel:</b> ${item.Telefone} <br>
                  <b>Anotaçoes:</b> ${anotacoes} </p>                 
              </div>
          `;

        // Crio o botao de delete para excluir individualmente um agendamento.
        let _id = item._id;
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn-close";
        deleteButton.addEventListener("click", async (event) => {
          event.stopPropagation(); // Para evitar a abertura do formulário de edição no click do usuario
          $("#deleteModal").modal("show");
          document
            .getElementById("confirmDelete")
            .addEventListener("click", async () => {
              const response = await fetch(
                `${URL_TESTE}/agenda/${_id}`,
                {
                  method: "delete",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );
              if ((await response.json()).deletedCount === 1) {
                let grid = document.getElementById("grid_list");
                grid.innerHTML = "";
                await preenchergrid();
                console.log(_id, "Card excluído");
                $("#deleteModal").modal("hide"); // Fecha o modal
              }
            });
        });
        card.appendChild(deleteButton);
        card.addEventListener("click", () => {
          abrirFormularioDeEdicao(item);
        });
        grid_list.appendChild(card);
      });
    }
  }
  // Crio a função para edição do agendamento, tratando somente os dados alterados pelo usuario
  function abrirFormularioDeEdicao(item) {
    // Obtenha o corpo do modal
    let modalBody = document.querySelector("#editModal .modal-body");
    // Limpe o corpo do modal
    modalBody.innerHTML = "";
    // Crie campos de entrada para cada propriedade do item
    let camposEditados = {};
    let camposEditadosJson = {}; // Declare camposEditadosJson aqui
    let ID;
    for (let key in item) {
      // Ignore os campos _id e __v
      if (key === "_id" || key === "__v") {
        if (key === "_id") {
          ID = item[key]; // Armazene o valor do ID
        }
        continue;
      }

      let div = document.createElement("div");
      div.className = "form-group";
      let label = document.createElement("label");
      label.for = key;
      label.innerText = key;

      let input;
      let adm = JSON.parse(sessionStorage.getItem("user_adm"));
      if (key === "Esteticista" && adm == 1) {
        input = document.createElement("select");
        user = item[key];
        input.id = key;
        input.className = "form-control";
        fetch(`${URL_TESTE}/agenda/`)
        .then((response) => response.json())
        .then((data) => {
            let uniqueNames = [
                ...new Set(data.map((item) => item.Esteticista)),
            ];
            uniqueNames.forEach((name) => {
                let option = document.createElement("option");
                option.value = name;
                option.text = name;
                option.selected = name === user;
                input.appendChild(option);
            });
        })
        .catch((error) => console.error("Erro:", error));
    }
     else {
        input = document.createElement("input");
        input.id = key;
        input.value = item[key];
        input.className = "form-control";
        if (adm == 0 && key === "Esteticista") {
          input.readOnly = true;
        }
      }

      if (key === "Data") {
        let partes = item[key].split("/");
        let dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
        input.type = "date";
        input.value = dataFormatada;
      }
      // Adicione um evento de escuta ao campo de entrada
      input.addEventListener("change", function () {
        if (this.id === "Data") {
          let partes = this.value.split("-");
          camposEditados[this.id] = `${partes[2]}/${partes[1]}/${partes[0]}`;
        } else {
          camposEditados[this.id] = this.value;
        }
        camposEditadosJson = JSON.stringify(camposEditados);
      });

      div.appendChild(label);
      div.appendChild(input);
      modalBody.appendChild(div);
    }
    // Adicione os novos campos "Anotacoes" e "Remarcar" no modal de edição
    let camposExtras = ["Anotacoes", "Remarcar"];
    for (let campo of camposExtras) {
      if (!item.hasOwnProperty(campo)) {
        let div = document.createElement("div");
        div.className = "form-group";
        let label = document.createElement("label");
        label.for = campo;
        label.innerText = campo;
        input = document.createElement("input");
        input.type = "text";
        input.id = campo;
        input.className = "form-control";

        // Adicione um evento de escuta ao campo de entrada
        input.addEventListener("change", function () {
          camposEditados[this.id] = this.value;
          camposEditadosJson = JSON.stringify(camposEditados); // Atualize camposEditadosJson aqui
        });
        div.appendChild(label);
        div.appendChild(input);
        modalBody.appendChild(div);
      }
    }
    //Função para salvar os dados editados pelo usuario
    bt_save.onclick = async () => {
      console.log(ID, camposEditadosJson);
      const response = await fetch(`${URL_TESTE}/agenda/${ID}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: camposEditadosJson,
      });
      if (response.status === 200) {
        exibirToast("sucesso.", "#269934");
        $("#editModal").modal("hide");
        let grid = document.getElementById("grid_list");
        // Limpar o conteúdo atual do grid
        grid.innerHTML = "";
        preenchergrid();
      }
    };
    // Mostre o modal
    $("#editModal").modal("show");
  }
};
