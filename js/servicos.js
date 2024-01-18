onload = () => {   
    
    document.getElementById('bt_serv').disabled = true;

    let user = JSON.parse(localStorage.getItem('data'));

    let nome = user.nome;
    console.log(nome);

    document.getElementById('nome').textContent = nome;
    
    serv.onblur = () => {
        if(serv.value == '') {
            serv.style.backgroundColor = '#F88';   
        }
        else {
            serv.style.backgroundColor = '#FFF';  
                                
        } 
    };  

}