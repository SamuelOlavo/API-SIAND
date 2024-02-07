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
    let user = JSON.parse(localStorage.getItem("user_nome"));
    let user_email = JSON.parse(localStorage.getItem("user_email")); 
  
    
    //
    document.getElementById("input_nome").value = user;
    document.getElementById("input_email").value = user_email;
  
  
    //Setando a data de hoje no campo de busca
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    let partes = today.split("-");
    let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];    
    console.log(hoje);


    bt_add.onclick = async () => {
        const nome = document.getElementById('input_nome').value; 
        const email = document.getElementById('input_email').value;
        const senha = document.getElementById('input_senha').value;
        const Telefone = document.getElementById('input_tel').value;
        const Endereco = document.getElementById('input_ender').value; 
        const Administrador = document.getElementById('chec_adm').value;

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
}