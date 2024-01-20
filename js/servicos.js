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


    const serv = document.getElementById('serv').value;
    fetch(`http://localhost:3000/servicos/${serv}`)
    .then(response => response.json())
    .then(data => {
        const list_prof = [...new Set(data.map(prof => prof.Esteticista))];            
        console.log(list_prof);
        // O elemento select é obtido pelo seu id
        const select = document.getElementById("prof");
        // Limpa as opções existentes       
        select.innerHTML = '';
        // Para cada esteticista na lista, uma nova opção é criada e adicionada ao select
        list_prof.forEach(esteticista => {
            const option = document.createElement('option');
            option.text = esteticista;
            select.appendChild(option);
        });
    })
    .catch((erro) => {
        console.error('Erro:', erro);
    });


    document.getElementById('bt_serv').disabled = true;
    let user = JSON.parse(localStorage.getItem('data'));
    let Esteticista = user.nome;   
    document.getElementById('nome').textContent = Esteticista;

    bt_serv.onclick = async () => {
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
                           
        }  if (response.status === 500) {
            exibirToast('Favor preecher o campo de Serviço', '#ff0000');      
        } if (response.status === 400) {
            exibirToast('Serviço ja cadastrado para essa Esteticista', '#ff0000');      
        }        
    }

}