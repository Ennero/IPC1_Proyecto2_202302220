const bodyParser = require("body-parser");//traigo las dependencias
const express= require("express");
const cors= require("cors");
const fs=require("fs");

const servidor=express();//variables imporantes
const puerto=5000;
const archivo='usuarios.js';//Archivito para guardar al salir

servidor.use(bodyParser.json());
servidor.use(cors());

let usuarios=[];//El arrayList de los usuarios

if(!fs.existsSync(archivo)){
    fs.writeFileSync(archivo, JSON.stringify(usuarios));
}else{
    const datos= fs.readFileSync(archivo, 'utf-8');
    usuarios = JSON.parse(datos);

}

function actualizarArchivo(){
    fs.writeFileSync(archivo,JSON.stringify(usuarios));
}


servidor.post('/inicio', (req,res) =>{
    const datos= req.body;
    console.log(datos)
    const usuario=usuarios.find(usuario=>{
        if(usuario.carnet=== datos.carnet && usuario.contraseña === datos.contraseña){
            return usuario
        }
    });
    if(!usuario){
        const respuesta={
            success: false,
            user: null
        }
        res.status(404).send(respuesta);
    }else{
        const respuesta={
            success: true,
            user: usuario
        }
        res.json(respuesta)
    }
})

servidor.post('/registro',(req,res)=>{
    const datos= req.body;
    const carne=usuarios.find(carne=>{
        if(carne.carnet=== datos.carnet){
            return carne;
        }});
        if(carne){
            const respuesta={
                success: false
            }
            res.status(404).send(respuesta);
        }else{
            usuarios.push(datos);
            const respuesta={
                success: true
            }
            res.json(respuesta)
            actualizarArchivo();
            res.status(201).send('Elemento creado correctamente');
        }
})





servidor.listen(puerto, () =>{//Esto sirve para levantar el "servidor"
    console.log('Servido levantado correctamente ', puerto)
})
