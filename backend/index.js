const bodyParser = require("body-parser");//traigo las dependencias
const express = require("express");
const cors = require("cors");
const fs = require("fs");



const servidor = express();//variables imporantes
const puerto = 5000;
const archivo = 'usuarios.js';//Archivito para guardar al salir
const archivo2 = 'publicaciones.js'


servidor.use(bodyParser.json({limit: '50mb'}));//Para tener un límite alto y que no lo rechace xd
servidor.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //Lo mismo pero permite analizar
servidor.use(cors({
    origin: 'http://localhost:3000', // o el origen que desees permitir
    methods: ['GET', 'POST', 'DELETE'], // o los métodos que desees permitir
    allowedHeaders: ['Content-Type'], // o los encabezados que desees permitir
}));

let usuarios = [];//El arrayList de los usuarios
let publicaciones = [];//El arraylist de los posts

//Comienzo creando y cargando los datos de los archivos
if (!fs.existsSync(archivo)) {
    fs.writeFileSync(archivo, JSON.stringify(usuarios));
} else {
    const datos = fs.readFileSync(archivo, 'utf-8');
    usuarios = JSON.parse(datos);
}
if (!fs.existsSync(archivo2)) {
    fs.writeFileSync(archivo2, JSON.stringify(publicaciones));
} else {
    const datos = fs.readFileSync(archivo2, 'utf-8');
    publicaciones = JSON.parse(datos);
}

//Funciones de actualización de archivo
function actualizarArchivo() {
    fs.writeFileSync(archivo, JSON.stringify(usuarios));
}
function actualizarArchivo2() {
    fs.writeFileSync(archivo2, JSON.stringify(publicaciones));
}

//Get publicaciones y usuarios
servidor.get('/home', (req, res) => {
    res.json(publicaciones);
})
servidor.get('/usuarios', (req,res)=>{
    res.json(usuarios)
})

//Validación del inicio de sesión
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


servidor.post('/subir', (req,res) =>{
    const datos=req.body;
    usuarios.push(datos);
    actualizarArchivo();
    res.status(201).send({response: 'Usuarios cargados correctamente'});
})

//Crear Usuario
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
        res.status(201).send({response: 'Elemento creado correctamente'});
    }
})
//Esto es para crear el post
servidor.post('/home',(req, res)=>{
    const nuevoPost=req.body;
    const guardarPost={
        id: (publicaciones.length+1),
        descripcion: nuevoPost.descripcion,
        imagen: nuevoPost.imagen,
        categoria: nuevoPost.categoria,
        fecha: nuevoPost.fecha,
        nombre: nuevoPost.nombre,
        carnet: nuevoPost.carnet,
        anonimos: nuevoPost.anonimo,
        carrera: nuevoPost.carrera,
        facultad: nuevoPost.facultad,
        likes: nuevoPost.likes,
        comentarios: nuevoPost.comentarios
    };
    publicaciones.push(guardarPost);
    actualizarArchivo2();
    res.status(201).send({response: 'Publicación guardada correctamente'})


})



//Eliminar un usuario
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
        usuarios.splice(indice, 1);//Si sí lo encontró lo elimina
        actualizarArchivo();
        res.send({ mensaje: 'Usuario eliminado correctamente' });
    }
});





servidor.listen(puerto, () => {//Esto sirve para levantar el "servidor"
    console.log('Servido levantado correctamente ', puerto)
    console.log(usuarios)
})
