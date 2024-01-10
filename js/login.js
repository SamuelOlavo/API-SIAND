onload = () => {   
    
    document.getElementById('entrar').disabled = true;

    // Funcoes de tratamento do formulario
    email.onblur = () => {
        if(email.value == '') {
            email.style.backgroundColor = '#F88';   
        }
        else {
            email.style.backgroundColor = '#FFF';  
                                
        } if (email.value != '' && senha.value != '') entrar.disabled = false;
        else entrar.disabled = true;
    };  
    senha.onblur = () => {
        if(senha.value == '') {
            senha.style.backgroundColor = '#F88';                   
        }
        else {
            senha.style.backgroundColor = '#FFF';
        } if (email.value != '' && senha.value != '') entrar.disabled = false;
        else entrar.disabled = true;
    }; 

    const handleSubmit = (event) => {
        event.preventDefault();
        const nome = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;  
        //Observado que a declaração da variavel deve estar dentro da função e sobre a consulta no DOM pode usar o ID normalmente

        fetch('http://localhost:3000/login/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome , senha, }),
        })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
    console.error('Error:', error);
    });
    document.querySelector('.loader').style.display = 'block';
    let timeout = window.setTimeout(function() {            
        document.querySelector('.loader').style.display = 'none';
        document.querySelector("form").reset();            
      }, 5000);
      document.getElementById('entrar').disabled = true;    
   }
    document.getElementById('login').addEventListener('submit', handleSubmit);
};
