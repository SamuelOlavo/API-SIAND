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
    let user = JSON.parse(localStorage.getItem('data'));
    let Esteticista = user;   
    document.getElementById('nome').textContent = Esteticista;


    bt_add.onclick = async () => {
        const Servicos = document.getElementById('serv').value;  
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
        preencherTabela(Esteticista);
        servicosSelecionados = [];
    }



    async function preencherTabela(Esteticista) {
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
                
            exibirToast('Atualizado planilha.', '#269934');
        } else if (response.status === 500) {
            exibirToast('Favor preecher o campo de Serviço', '#ff0000');
        } else if (response.status === 400) {
            exibirToast('Serviço ja cadastrado para essa Esteticista', '#ff0000');
        }
    }    
  
}