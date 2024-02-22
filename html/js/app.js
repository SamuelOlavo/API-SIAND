import dotenv from 'dotenv';
dotenv.config();

<<<<<<< HEAD
export const URL_TESTE = "http://localhost:3000";
//export const URL_TESTE = "https://api-siand.vercel.app";
export const clientID = "771987966504-vri95o8gkbvprv8rc3l4d1c30jfjhc0i.apps.googleusercontent.com";
export const URL_PRODUCAO = "http://api-siand.vercel.app";
=======
export const URL_TESTE = process.env.URL;

export const clientID = "771987966504-vri95o8gkbvprv8rc3l4d1c30jfjhc0i.apps.googleusercontent.com";



>>>>>>> e892dac078556830a2ada738e72a18b3c4323fcc
