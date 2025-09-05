
// importacion de express 

const express = require ('express');
const app = express();
require('dotenv').config();

//Definimos el puerto
const PORT = process.env.PORT;
 // ruta principal 
 app.get('/',(req,res)=> {
    res.send('holiis !! bienbenidos a express')
 })
 // ruta 2
 app.get('/mensaje1',(req,res)=> {
    res.send('holiis secreto')
 })
  // ruta 2
  app.post('/mensaje2',(req,res)=> {
    res.send('holiis post falso')
 })
 app.post('/mensaje1',(req,res) =>{
    res.send('Un post falso');
});
//Ruta con respuesta en formato JSON
app.get('/mensaje2',(req,res) =>{
    let jsonsito= {
        "mensaje":"Holiii"
    };
    //res.send('Este es otro endpoint');
    res.json(jsonsito);
});
// ruta post que recibe 





// iniciar el servidor 
 app.listen(PORT,()=>{
    console.log("servidor iniciando")
 })



