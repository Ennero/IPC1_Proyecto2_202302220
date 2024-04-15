const bodyParser = require("body-parser");//traigo las dependencias
const express= require("express");
const cors= require("cors");
const fs=require("fs");

const servidor=express();//variables imporantes
const puerto=5000;
const archivo='usuarios.json';//Archivito para guardar al salir

servidor.use(bodyParser.json());
servidor.use(cors());

let personas=[];//El arrayList de los usuarios

if(!fs.existsSync(archivo)){
    fs.writeFileSync(archivo, JSON.stringify(personas));
}else{
    const datos= fs.readFileSync(archivo, 'utf-8');
    personas=JSON.parse(archivo);
}

function actualizarArchivo(){
    fs.writeFileSync(archivo,JSON.stringify(personas));
}



servidor.listen(puerto, () =>{
    console.log('Servido levantado correctamente ', puerto)
})
