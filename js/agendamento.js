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
    
    // document.getElementById('btnEnviar').disabled = true;

//As informações de serviços e esteticista estão sendo carregadas na interação do tel e ser por que nao estava dando certo no carregamento da pagina.

    tel.onclick = async () => {
        fetch(`http://localhost:3000/servicos/servicos`)
        .then(response => {
            if(response.status === 200){            
                return response.json();                        
            } else {
                throw new Error('Erro de busca');
            }
        })
        .then(data => {
            console.log(data);
            const list_serv = [...new Set(data.map(serv => serv.Servicos))];            
            
            const select = document.getElementById("serv");
            
            // Limpa as opções existentes
            select.innerHTML = '';
            
            list_serv.forEach(servicos => {
                const option = document.createElement('option');
                option.text = servicos;
                select.appendChild(option);
            });
        })
        .catch(error => console.log(error));
    };

    serv.onclick = async () => {
        const serv = document.getElementById('serv').value;
        fetch(`http://localhost:3000/servicos/servico/${serv}`)
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
    };

    nome.onblur = () => {
        if(nome.value == '') {
            nome.style.backgroundColor = '#F88';   
        }
        else {
            nome.style.backgroundColor = '#FFF';  
                                
        } 
    };  
    dateNas.onblur = () => {
        if(dateNas.value == '') {
            dateNas.style.backgroundColor = '#F88';                   
        }
        else {
            dateNas.style.backgroundColor = '#FFF';
        } 
    };  
    $(document).ready(function(){
        $('#tel').mask('(00) 00000-0000');
      });
    tel.onblur = () => {
        if(tel.value == '') {
            tel.style.backgroundColor = '#F88';                   
        }
        else {
            tel.style.backgroundColor = '#FFF';
        } 
    }; 

    prof.onblur = () => {
        if (prof.value == '') {
            prof.style.backgroundColor = '#F88';
         }
        else {
            prof.style.backgroundColor = '#FFF';
        } 
    };  
    // serv.onblur = () => {
    //     if (serv.value == '') {
    //         serv.style.backgroundColor = '#F88';
    //      }
    //     else {
    //         serv.style.backgroundColor = '#FFF';
    //     } 
    // }; 

    // Data e Hora do Agendamento
    var today = new Date().toISOString().split('T')[0];                    
    console.log (today);
    
    date.onblur = () => {
        if(date.value == '' || date.value < today) {
            date.style.backgroundColor = '#F88';          
        }
        else {
            date.style.backgroundColor = '#FFF';            
        }
    };  
    
    hora.onblur = () => {
        if( hora.value < '09:00' || hora.value > '18:00')  {
            hora.style.backgroundColor = '#F88';
        } else {
            hora.style.backgroundColor = '#FFF';
        }
    };  


    const handleSubmit = async (event) => {
        event.preventDefault();  
        const data = document.getElementById('date').value;
        let partes = data.split('-');
        let dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];

        const dataNas = document.getElementById('dateNas').value;
        let traco = dataNas.split('-');
        let dataNasFormatada = traco[2] + '/' + traco[1] + '/' + traco[0];
                      

        const NomeCliente = document.querySelector('input[name=nome]').value;
        const DataNascimento = dataNasFormatada;
        const Telefone = document.querySelector('input[name=tel]').value;        
        const Esteticista = document.getElementById('prof').value;  
        const Servicos = document.getElementById('serv').value;
        const Data = dataFormatada;
        const Horario = document.getElementById('hora').value;

        try {
            const response = await fetch('http://localhost:3000/agenda/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ NomeCliente , DataNascimento, Telefone , Esteticista , Servicos , Data ,  Horario }),
            }); 
            if (response.status === 201) {
                exibirToast('Agendamento realizado com sucesso.', '#269934');
                console.log(response);
                document.querySelector("form").reset();  
            } else {
                exibirToast('Favor preencher todos os campos do formulario.', '#ff0000');
                console.log(response);
            }
        } catch (error) {
            console.error('Error:', error);
            exibirToast('Erro no cadastro. Por favor, tente novamente.', '#ff0000');
        }        
   
    };
document.getElementById('agendamento').addEventListener('submit', handleSubmit);    
    
}
