
import { URL_TESTE } from './app.js';

import { URL_PRODUCAO } from './app.js';


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

    let trataAdm = async () => { 
        let adm = JSON.parse(sessionStorage.getItem("user_adm"));    
        if (adm == 1) { 
            document.getElementById('list_user').disabled = false;        
            atualizarUsuarios ();            
        } else {            
            let user_email = JSON.parse(sessionStorage.getItem("user_email")); 
            var option = document.createElement("option");
            option.text = user_email;
            option.value = user_email;     
            var select = document.getElementById("list_user");      
            select.add(option);            
            select.value = user_email;
            document.getElementById('chec_adm').disabled = true;
        }
    }
    trataAdm ();
  
    //Setando a data de hoje no campo de busca
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString().split('T')[0];
    let partes = today.split("-");
    let hoje = partes[2] + "/" + partes[1] + "/" + partes[0];    
    console.log(hoje);
    let user = JSON.parse(sessionStorage.getItem("user_nome"));
    document.getElementById('userStatus').textContent = 'USER: ' + user ; 
    document.getElementById('dia').textContent = '' + hoje ; 

    const selectElement = document.getElementById("list_user");    



document.getElementById('sair').addEventListener('click', function() {
    sessionStorage.clear();
    window.location = "../html/login.html";
});
    

function atualizarUsuarios() {
    let emailLogado = JSON.parse(sessionStorage.getItem("user_email"));
    const selectElement = document.getElementById('list_user');

    selectElement.onchange = async () => {
        document.getElementById('input_nome').value = ''; 
        document.getElementById('input_email').value =  '';
        document.getElementById('input_senha').value =  '';
        document.getElementById('input_tel').value =  '';
        document.getElementById('input_ender').value =  ''; 
        document.getElementById('chec_adm').checked =  false;    
    }

    fetch(`${URL_TESTE}/users/`)
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
            option.selected = email === emailLogado; // Selecione a opção se o email for o mesmo do usuário logado
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.log(error));
}


// Chamar a função no onload da página




const buscar = document.getElementById("buscar");
let originalData = null;

var ID;

buscar.onclick = async () => {    
    const email = document.getElementById('list_user').value;
    fetch(`${URL_TESTE}/users/byEmail/${email}`)
    .then(response => {
        if(response.status === 200){            
            return response.json();                        
        } else {
            throw new Error('Erro de busca');
        }
    })
    .then(data => {
        ID = data._id; // Armazena o ID do usuário na variável global

        originalData = { // Armazena os dados originais do usuário na variável global
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            Telefone: data.Telefone,
            Endereco: data.Endereco,
            Administrador: data.Administrador
        };

        document.getElementById('input_nome').value = data.nome || ''; 
        document.getElementById('input_email').value = data.email || '';
        document.getElementById('input_senha').value = data.senha || '';
        document.getElementById('input_tel').value = data.Telefone || '';
        document.getElementById('input_ender').value = data.Endereco || ''; 
        document.getElementById('chec_adm').checked = data.Administrador || false;
        

        document.getElementById('bt_salvar').disabled = false;
        document.getElementById('bt_excluir').disabled = false;
       
    })    
    .catch(error => console.log(error));
};



const bt_salvar = document.getElementById("bt_salvar");
bt_salvar.onclick = async () => {
    let data = {
        nome: document.getElementById('input_nome').value,
        email: document.getElementById('input_email').value,
        Telefone: document.getElementById('input_tel').value,
        Endereco: document.getElementById('input_ender').value,
        Administrador: document.getElementById('chec_adm').checked
    };

    // Se a senha foi modificada, inclua-a nos dados a serem enviados
    if (document.getElementById('input_senha').value !== originalData.senha) {
        data.senha = document.getElementById('input_senha').value;
    }

    // Verifique se os dados são diferentes dos originais
    if (JSON.stringify(data) !== JSON.stringify(originalData)) {
        const response = await fetch(`${URL_TESTE}/users/${ID}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            exibirToast("Dados atualizados com sucesso!", "#269934");
            buscar.click();
        } else {
            exibirToast('Erro ao atualizar os dados.', '#ff0000');               
        }
    } else {
        console.log('Nenhum dado foi alterado.');
    }
}



const bt_excluir = document.getElementById("bt_excluir");
bt_excluir.onclick = async () => {
    try {
        const response = await fetch(`${URL_TESTE}/users/${ID}`, {
            method: "delete",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        }); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json(); // Adicione esta linha

        if (responseData.deletedCount === 1) {
            exibirToast("Usuario excluido com sucesso!", "#269934");           
            
            let div = document.getElementById('dados'); // Obtenha a div pelo ID
            let inputs = div.getElementsByTagName('input'); // Obtenha todos os campos de entrada na div

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value != '') { // Verifique se o campo de entrada é do tipo texto
                    inputs[i].value = ''; // Limpe o campo de entrada
                }
            }
            let adm = JSON.parse(sessionStorage.getItem("user_adm"));    
            if (adm == 1) { 
            atualizarUsuarios();
        }
        } else {
            console.log('Nenhum usuário foi excluído.');
        }
    } catch (error) {
        console.log('Erro ao excluir o usuário:', error);
    }
}




}