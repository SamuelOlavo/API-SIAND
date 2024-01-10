onload = () => {   


    
    document.getElementById('enviar').disabled = true;

    // Funcoes de tratamento do formulario
    nome.onblur = () => {
        if(nome.value == '') {
            nome.style.backgroundColor = '#F88';   
        }
        else {
            nome.style.backgroundColor = '#FFF';  
                                
        } if (nome.value != '' && senha.value != '' && email.value != '' && rep_senha.value != '') enviar.disabled = false;
        else enviar.disabled = true;
    };  
    email.onblur = () => {
        if(email.value == '') {
            email.style.backgroundColor = '#F88';   
        }
        else {
            email.style.backgroundColor = '#FFF';  
                                
        } if (nome.value != '' && senha.value != '' && email.value != '' && rep_senha.value != '') enviar.disabled = false;
        else enviar.disabled = true;
    };  
    senha.onblur = () => {
        if(senha.value == '') {
            senha.style.backgroundColor = '#F88';                   
        }
        else {
            senha.style.backgroundColor = '#FFF';
        } if (nome.value != '' && senha.value != '' && email.value != '' && rep_senha.value != '') enviar.disabled = false;
        else enviar.disabled = true;
    };
    rep_senha.onblur = () => {        
        if(rep_senha.value != senha.value) {
            rep_senha.style.backgroundColor = '#F88'; 
            document.getElementById("rep").innerHTML = "<b>As senhas não conferem</b>";        
            rep_senha.value = "";  
        }
        else {
            rep_senha.style.backgroundColor = '#FFF';
            document.getElementById("rep").innerHTML = "Repita a Senha";                                  
        }
       if (nome.value != '' && senha.value != '' && email.value != '' && rep_senha.value != '') enviar.disabled = false;
        else enviar.disabled = true;
    };  


    const handleSubmit = async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;  
        const senha = document.getElementById('senha').value;  

        const response = await fetch(`http://localhost:3000/users/email/${email}`);

        if(response.status === 200){
            alert('O email já existe. Por favor, escolha outro.');
        }else{
        fetch('http://localhost:3000/users/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome , email, senha }),
        })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
    console.error('Error:', error);
    })}
    
    if(response.status != 200){              
        document.querySelector("form").style.display = 'none';
        document.querySelector("form").reset();
        document.getElementById("sucesso").innerHTML = "Obrigado por se Inscrever";       
    }
      document.getElementById('enviar').disabled = true;    
   }
    document.getElementById('cadastro').addEventListener('submit', handleSubmit);
};
