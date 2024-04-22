const bodyParser = require("body-parser");//traigo las dependencias
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const servidor = express();//variables imporantes
const puerto = 5000;
const archivo = 'usuarios.js';//Archivito para guardar al salir
const archivo2 = 'publicaciones.js'

servidor.use(bodyParser.json());
servidor.use(cors());

let usuarios = [];//El arrayList de los usuarios
let publicaciones = [];//El arraylist de los posts

if (!fs.existsSync(archivo)) {
    fs.writeFileSync(archivo, JSON.stringify(usuarios));
} else {
    const datos = fs.readFileSync(archivo, 'utf-8');
    usuarios = JSON.parse(datos);
}
if (!fs.existsSync(archivo2)) {
    fs.writeFileSync(archivo2, JSON.stringify(usuarios));
} else {
    const datos = fs.readFileSync(archivo2, 'utf-8');
    usuarios = JSON.parse(datos);
}

function actualizarArchivo() {
    fs.writeFileSync(archivo, JSON.stringify(usuarios));
}
function actualizarArchivo2() {
    fs.writeFileSync(archivo, JSON.stringify(publicaciones));
}
servidor.get('/home', (req, res) => {
    res.json(publicaciones);
})

servidor.get('/usuarios', (req,res)=>{
    res.json(usuarios)
})


servidor.post('/inicio', (req, res) => {
    const datos = req.body;
    console.log(datos)
    const usuario = usuarios.find(usuario => {
        if (usuario.carnet === datos.carnet && usuario.contraseña === datos.contraseña) {
            return usuario
        }
    });
    if (!usuario) {
        const respuesta = {
            success: false,
            user: null
        }
        res.status(404).send(respuesta);
    } else {
        const respuesta = {
            success: true,
            user: usuario
        }
        res.json(respuesta)
    }
})

servidor.post('/registro', (req, res) => {
    const datos = req.body;
    const carne = usuarios.find(carne => {
        if (carne.carnet === datos.carnet) {
            return carne;
        }
    });
    if (carne) {
        const respuesta = {
            success: false
        }
        res.status(404).send(respuesta);
    } else {
        usuarios.push(datos);
        const respuesta = {
            success: true
        }
        res.json(respuesta)
        actualizarArchivo();
        res.status(201).send('Elemento creado correctamente');
    }
})

servidor.delete('/usuarios/:carnet', (req, res) => {
    const carnet = parseInt(req.params.carnet);
    console.log(carnet)
    const indice = usuarios.findIndex(usuario => {//para encontrar el índice de donde está el carnet
        console.log(usuario.carnet)
        if (usuario.carnet === carnet) {
            console.log("Elemento encontrado")
            return usuario
        }
    });
    if (indice === -1) {
        res.status(404).send({ mensaje: 'Elemento no encontrado' });
    } else {
        dataStudents.splice(index, 1);//Si sí lo encontró lo elimina
        actualizarArchivo();
        res.send({ mensaje: 'Elemento eliminado correctamente' });
    }
});





servidor.listen(puerto, () => {//Esto sirve para levantar el "servidor"
    console.log('Servido levantado correctamente ', puerto)
})
