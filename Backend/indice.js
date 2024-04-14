//Las Dependencias
const fs=require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const cors= require('cors');

//Las variables de los servidor, el puerto y el
//archivo para no tener que meter todo a cada rato
const servidor=express();
const puerto= 5000;
const archivito='usuarios.json'

//uso bodyParser y los cors
servidor.use(bodyParser.json())
servidor.use(cors());

//Aquí uso el array como una base de datos super sofisticada
let datos=[];

//Aquí verifico la existencia del archivo y actualizo la base de datos
if (!fs.existsSync(archivito)){
    fs.writeFileSync(archivito, JSON.stringify(datos))
}else{
    const serivicio= fs.readFileSync(archivito,'utf-8')
    datos=JSON.parse(serivicio)
}

//Función para actualizar el archivito
function actualizar(){
    fs.writeFileSync(archivito,JSON.stringify(datos))
}


//Aquí hago el endpoint
servidor.get("/", (req,res) =>{
    let saludo ={
        Saludo: "Funcionando..."
    };
    res.json(saludo);
}
);

//Aquí retorno los datos de la lista
servidor.get("/students", (req,res) =>{
    res.json(datos)

});

//Aquí lo que hago es buscar de acuerdo a carnet
servidor.get("/students/:Carnet", (req,res)=>{
    const Carnet=req.params.Carnet
    const student = datos.find(student=>student.Carnet === Carnet);
    if (!student){
        res.status(404).send({response: "Elemento no encontrado"})
    }else{
        res.json(student)
    }
})

servidor.put("/students/:Carnet", (req,res)=>{
    const Carnet= req.params.carnet;
    const actualizar=req.body;
    const indice=datos.findIndex(student=>student.carnet=== carnet)
    if (indice===-1){
        res.status(404).send({responde: "Elemento no encontrado"})
    }else{
        datos[indice].nombre=actualizar.nombre;
        datos[indice].apellido=actualizar.apellido;
        datos[indice].edad=actualizar.edad;
        res.send('Elemento actualizado correctamente')
    }
})


//Aquí lo que hago es la incersón de los datos de la lista
servidor.post("/students",(req,res) =>{
    const newStudent= req.body;
    datos.push(newStudent);
    res.status(201).send({response: "Elemento creado correctamente"})
})

//Aquí inicializo el servidor en el puerto
servidor.listen(
    puerto, () => {
        console.log(`Servidor escuchando en el puerto ${puerto}`);
}
);