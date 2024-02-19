function handleCredentialResponse(response) {
  const idToken = response.credential;

  fetch(`http://localhost:3000/login/authGoogle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }), // Enviar apenas o token
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao enviar os dados para o backend');
    }
    return response.json();
  })
  .then(data => {
    console.log('Resposta do backend:', data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

window.onload = function () {
  const clientID = "771987966504-vri95o8gkbvprv8rc3l4d1c30jfjhc0i.apps.googleusercontent.com";

  google.accounts.id.initialize({
    client_id: clientID,
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("LoginGoogle"), {
    theme: "filled_black",
    size: "large",
    type: "standard",
    shape: "pill",
    locale: "pt-BR",
    logo_alignment: "left",
  });

  google.accounts.id.prompt(); // also display the One Tap dialog
}
