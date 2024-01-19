onload = () => {   
    
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
        console.log(response);
        console.log(Servicos);
        console.log(Esteticista);
        // document.getElementById("rep").innerHTML = "<b>As senhas não conferem</b>";
    }

}