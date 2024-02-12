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
    // let user = JSON.parse(localStorage.getItem("user_nome"));
    // let user_email = JSON.parse(localStorage.getItem("user_email")); 
  
    
    // //
    // document.getElementById("input_nome").value = user;
    // document.getElementById("input_email").value = user_email;
  
  
    //Setando a data de hoje no campo de busca
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    let partes = today.split("-");
    let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];    
    console.log(hoje);

    const selectElement = document.getElementById("list_user");



fetch('http://localhost:3000/users/')
.then(response => {
    if(response.status === 200){            
        return response.json();                        
    } else {
        throw new Error('Erro de busca');
    }
})
.then(data => {    
    const list = [...new Set(data.map(user => user.email))]; // Alterado para user.email
        
    // Limpa as opções existentes
    selectElement.innerHTML = '';
    
    list.forEach(email => {
        const option = document.createElement('option');
        option.text = email; // Alterado para email
        selectElement.appendChild(option);
    });
})
.catch(error => console.log(error));

const buscar = document.getElementById("buscar");


buscar.onclick = async () => {    
    const email = document.getElementById('list_user').value;
    fetch(`http://localhost:3000/users/byEmail/${email}`)
    .then(response => {
        if(response.status === 200){            
            return response.json();                        
        } else {
            throw new Error('Erro de busca');
        }
    })
    .then(data => {
        ID = data._id; // Armazena o ID do usuário na variável global
        console.log(ID);
        document.getElementById('input_nome').value = data.nome || ''; 
        document.getElementById('input_email').value = data.email || '';
        document.getElementById('input_senha').value = data.senha || '';
        document.getElementById('input_tel').value = data.Telefone || '';
        document.getElementById('input_ender').value = data.Endereco || ''; 
        document.getElementById('chec_adm').checked = data.Administrador || false;  

       
       
    })
    
    .catch(error => console.log(error));
};



const bt_salvar = document.getElementById("bt_salvar");


bt_salvar.onclick = async () => {
    let data = {
        nome: document.getElementById('input_nome').value,
        email: document.getElementById('input_email').value,
        senha: document.getElementById('input_senha').value,
        Telefone: document.getElementById('input_tel').value,
        Endereco: document.getElementById('input_ender').value,
        Administrador: document.getElementById('chec_adm').checked
    };

    const response = await fetch(`http://localhost:3000/users/${ID}`, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    console.log(data);
    if (response.status === 200) {
        exibirToast('Cadastro atualizados com sucesso.', '#269934');
                       
    }  if (response.status === 500) {
        exibirToast('Erro servidor ', '#ff0000');   
    }
}


}