onload = () => {  

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

    let user = JSON.parse(localStorage.getItem('data'));
    let Esteticista = user.nome;   
    document.getElementById('nome').value = Esteticista;
    console.log(Esteticista)
    
    var today = new Date().toISOString().split('T')[0];  
    let partes = today.split('-');
    let hoje = partes[2] + '/' + partes[1] + '/' + partes[0];                  
    console.log (today);
    document.getElementById('data').value = today;

    bt_busca.onclick = () => {
        preenchergrid(Esteticista);
        agendamentoselecionado = [];
    }

    const grid = document.getElementById('grid_list');

    async function preenchergrid(Esteticista) {
        const data = document.getElementById('data').value;
        let partes = data.split('-');
        let dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];
        console.log(dataFormatada);
        const response = await fetch(`http://localhost:3000/agenda/servicos/${Esteticista}`
        , {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Data: dataFormatada})
        });
       
        if (response.status === 200) {
            const data = await response.json(); 
            console.log(data);               
            // Acessar o tbody pelo id
            let grid = document.getElementById('grid_list');
            // Limpar o conteúdo atual do tbody
            grid_list.innerHTML = '';

            let agendamentoselecionado = [];
                
            // Iterar sobre os dados e adicionar novas linhas ao tbody
            data.forEach((item, index) => {
                // Adicione um id único para cada checkbox
                let checkboxId = 'exc' + index;
                grid_list.innerHTML += `
                <div class="card mb-1" >
                <div class="card-body">
                <h6 class="card-title">${index + 1} - ${item.Data} | ${item.Horario} - ${item.Servicos} </h6>
                <p class="card-text"><b>Cliente:</b> ${item.NomeCliente} | <b>Data de nascimento:</b> ${item.DataNascimento} | <b>Tel:</b> ${item.Telefone} </p>
                </div>
                </div>
                `;
            });
                // Adicione um ouvinte de eventos para o checkbox
                data.forEach((item, index) => {
                    let checkboxId = 'exc' + index;
                    let checkbox = document.getElementById(checkboxId);
                    checkbox.addEventListener('change', function() {
                        if(this.checked) {
                            // Adicione o serviço à lista de serviços selecionados
                            agendamentoselecionado.push(item.Servicos);
                        } else {
                            // Remova o serviço da lista se o checkbox for desmarcado
                            agendamentoselecionado = agendamentoselecionado.filter(servico => servico !== item.Servicos);
                        }
                        // console.log(servicosSelecionados);  // Log para verificar os serviços selecionados
                    });
                });   

                // bt_excl.onclick = async () => {        
                //     const response = await fetch('http://localhost:3000/servicos/excluir', {
                //         method: 'delete',
                //         headers: {
                //             'Accept': 'application/json',
                //             'Content-Type': 'application/json',
                //         },
                //         body: JSON.stringify({ Servicos: servicosSelecionados }),            
                //     });
                //     console.log(response);
                //     console.log('teste', servicosSelecionados);
                //     if (response.status === 200) {
                //         exibirToast('Serviço excluido com sucesso.', '#269934');                         
                //         preencherTabela(Esteticista);      
                                       
                //     } }  
                
            exibirToast('Atualizado planilha.', '#269934');
        } else if (response.status === 500) {
            exibirToast('Favor preecher o campo de Serviço', '#ff0000');
        } else if (response.status === 400) {
            exibirToast('Serviço ja cadastrado para essa Esteticista', '#ff0000');
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





















}
