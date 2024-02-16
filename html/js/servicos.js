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
   
    document.getElementById('bt_add').disabled = true;
         //Setando a data de hoje no campo de busca
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    let partes = today.split("-");
    let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];    
    console.log(hoje);
    let user = JSON.parse(sessionStorage.getItem("user_nome"));
    document.getElementById('userStatus').textContent = 'USER: ' + user ; 
    document.getElementById('dia').textContent = '' + hoje ; 

    document.getElementById('sair').addEventListener('click', function() {
        sessionStorage.clear();
        window.location = "../html/login.html";
    });
        
   
    trataAdm = async () => {        
        let adm = JSON.parse(sessionStorage.getItem("user_adm"));
        console.log(adm);
    
        if (adm == 1) { 
            document.getElementById('list_user').disabled = false;
            const select = document.getElementById("list_user");            
            // Adicione o nome do usuário da sessão como uma opção, se existir
            let user = JSON.parse(sessionStorage.getItem("user_nome"));
            if (user) {
                let option = document.createElement('option');
                option.value = user;
                option.text = user;
                select.appendChild(option);
            }            
            fetch('http://localhost:3000/servicos/')
            .then(response => response.json())
            .then(data => {
              let uniqueNames = [...new Set(data.map(item => item.Esteticista))];
                // Use os nomes únicos para preencher o elemento select
              uniqueNames.forEach(name => {
                // Se o nome já não foi adicionado (como o nome do usuário da sessão), adicione-o
                if (name !== user) {
                    let option = document.createElement('option');
                    option.value = name;
                    option.text = name;
                    select.appendChild(option);
                }
              });
            })
            .catch(error => console.error('Erro:', error));
            
        } else {        
            let user_nome = JSON.parse(sessionStorage.getItem("user_nome")); 
            var option = document.createElement("option");
            option.text = user_nome;
            option.value = user_nome;     
            var select = document.getElementById("list_user");      
            select.add(option);            
            select.value = user_nome;
            select.text = user_nome;
            // let Esteticista = user_nome;
        }
    }
    trataAdm ();
    
    


    bt_add.onclick = async () => {
        const Servicos = document.getElementById('serv').value; 
        const Esteticista = document.getElementById('list_user').value; 
        const response = await fetch('http://localhost:3000/servicos/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Esteticista , Servicos }),
            
        });
        if (response.status === 201) {
            exibirToast('Cadastro realizado com sucesso.', '#269934');
            document.getElementById("serv").value ='';  
            preencherTabela(Esteticista);      
                           
        }  if (response.status === 500) {
            exibirToast('Favor preecher o campo de Serviço', '#ff0000');      
        } if (response.status === 400) {
            exibirToast('Serviço ja cadastrado para essa Esteticista', '#ff0000');      
        }        
    }

    bt_atl.onclick = () => {
        preencherTabela();
        servicosSelecionados = [];
    }



     preencherTabela = async () => {
        let Esteticista = document.getElementById('list_user').value;
        const response = await fetch(`http://localhost:3000/servicos/esteticista/${Esteticista}`);    
        if (response.status === 200) {
            const data = await response.json();                
            // Acessar o tbody pelo id
            let tbody = document.getElementById('tbody');
            // Limpar o conteúdo atual do tbody
            tbody.innerHTML = '';

            let servicosSelecionados = [];
                
            // Iterar sobre os dados e adicionar novas linhas ao tbody
            data.forEach((item, index) => {
                // Adicione um id único para cada checkbox
                let checkboxId = 'exc' + index;
                tbody.innerHTML += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.Esteticista}</td>
                        <td>${item.Servicos}</td>
                        <td><input id="${checkboxId}" type="checkbox"></td>
                    </tr>
                `;
              
            });
                // Adicione um ouvinte de eventos para o checkbox
                data.forEach((item, index) => {
                    let checkboxId = 'exc' + index;
                    let checkbox = document.getElementById(checkboxId);
                    checkbox.addEventListener('change', function() {
                        if(this.checked) {
                            // Adicione o serviço à lista de serviços selecionados
                            servicosSelecionados.push(item.Servicos);
                        } else {
                            // Remova o serviço da lista se o checkbox for desmarcado
                            servicosSelecionados = servicosSelecionados.filter(servico => servico !== item.Servicos);
                        }
                        // console.log(servicosSelecionados);  // Log para verificar os serviços selecionados
                    });
                });   

                bt_excl.onclick = async () => {        
                    const response = await fetch('http://localhost:3000/servicos/excluir', {
                        method: 'delete',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ Servicos: servicosSelecionados }),            
                    });
                    console.log(response);
                    console.log('teste', servicosSelecionados);
                    if (response.status === 200) {
                        exibirToast('Serviço excluido com sucesso.', '#269934');                         
                        preencherTabela(Esteticista);      
                                       
                    } }                
           
        } else if (response.status === 500) {
            exibirToast('Favor preecher o campo de Serviço', '#ff0000');
        } else if (response.status === 400) {
            exibirToast('Serviço ja cadastrado para essa Esteticista', '#ff0000');
        }
    }    
  
}