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

    document.getElementById('bt_serv').disabled = true;

    let user = JSON.parse(localStorage.getItem('data'));

    let Esteticista = user.nome;
    // console.log(nome);

    document.getElementById('nome').textContent = Esteticista;
    
    // serv.onblur = () => {
       
    // };
    
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
    // serv.onclick = () => {
    //     document.getElementById("msg").innerHTML = '';
    // }

}