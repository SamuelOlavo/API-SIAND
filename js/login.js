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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;  
          
        const response = await fetch('http://localhost:3000/login/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email , senha }),
            
        });                       

        if(response.status === 200){            
            const data = await response.json();                        
            console.log(data)   
            alert("Bem VINDO " + data.nome);          
            localStorage.setItem('data', JSON.stringify(data));
            window.location = "../html/home.html";
        }
         else {
            alert('Usuario nao cadastrado');
            document.querySelector("form").reset();
        }    
        document.getElementById('entrar').disabled = true;    
    }
    document.getElementById('login').addEventListener('submit', handleSubmit);
};
