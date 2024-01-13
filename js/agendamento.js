onload = () => {   
    
    fetch(`http://localhost:3000/agenda/`)
    .then(response => {
        if(response.status === 200){            
            return response.json();                        
        } else {
            throw new Error('Erro de busca');
        }
    })
    .then(data => {
        console.log(data[0].Esteticista);
        localStorage.setItem('data', JSON.stringify(data[0].Esteticista));
    })
    .catch(error => console.log(error));
    
    

    document.getElementById('btnEnviar').disabled = true;

    nome.onblur = () => {
        if(nome.value == '') {
            nome.style.backgroundColor = '#F88';   
        }
        else {
            nome.style.backgroundColor = '#FFF';  
                                
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
    };  
    dateNas.onblur = () => {
        if(dateNas.value == '') {
            dateNas.style.backgroundColor = '#F88';                   
        }
        else {
            dateNas.style.backgroundColor = '#FFF';
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
    };  
    tel.onblur = () => {
        if(tel.value == '') {
            tel.style.backgroundColor = '#F88';                   
        }
        else {
            tel.style.backgroundColor = '#FFF';
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
    }; 

    prof.onblur = () => {
        if (prof.value == '') {
            prof.style.backgroundColor = '#F88';
         }
        else {
            prof.style.backgroundColor = '#FFF';
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
    };  

    // nome.onblur = () => {        
    //     fetch(`http://localhost:3000/agenda/`)
    //     .then(response => response.json())
    //     .then(data => {            
    //         console.log(data);
    //         document.getElementById("serv").innerHTML = (data);
    //     })
    //     .catch((erro) => {
    //         console.erro('Erro:', erro);
    //     })
    // };

    serv.onblur = () => {
        if (serv.value == '') {
            serv.style.backgroundColor = '#F88';
         }
        else {
            serv.style.backgroundColor = '#FFF';
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
    }; 
    
    // serv.onblur = () => {
    //     const prof = document.getElementById('prof').value;
    //     fetch(`http://localhost:3000/agenda/`)
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById("serv").innerHTML = (data.Servicos);
    //     })
    //     .catch((erro) => {
    //         console.erro('Erro:', erro);
    //     })
    // };

    // Data e Hora do Agendamento
    var today = new Date().toISOString().split('T')[0];                    
    console.log (today);
    date.onblur = () => {
        if(date.value == '' || date.value < today) {
            date.style.backgroundColor = '#F88';
            btnEnviar.disabled = true;                                       
        }
        else {
            date.style.backgroundColor = '#FFF';            
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
    };  
    
    hora.onblur = () => {
        if( hora.value < '09:00' || hora.value > '18:00')  {
            hora.style.backgroundColor = '#F88';
        } else {
            hora.style.backgroundColor = '#FFF';
        } if (nome.value != '' && tel.value != '' && dateNas.value != '' && date.value != '' && hora.value != '' && date.value > today && serv.value != '') btnEnviar.disabled = false;
        else btnEnviar.disabled = true;
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
