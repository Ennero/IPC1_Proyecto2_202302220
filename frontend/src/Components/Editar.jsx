import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export const Editar = () => {

    //Las variables de los campos a llenar
    const [contraseña1, setContraseña1] = useState('');
    const [contraseña2, setContraseña2] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState('');
    const [correo, setCorreo] = useState('');
    const [facultad, setFacultad] = useState('');
    const [carrera, setCarrera] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    let carnet = cookies.usuario.carnet;


    const actualizarDatos = (evento) => {

        evento.preventDefault();
        if (contraseña1.length > 7) {
            if (contraseña1 === contraseña2) {
                const numeros = (contraseña2.match(/\d/g) || []).length;
                const minusculas = (contraseña2.match(/[a-z]/g) || []).length;
                const mayusculas = (contraseña2.match(/[A-Z]/g) || []).length;
                const especiales = (contraseña2.match(/[\W_]/g) || []).length;
                if (numeros > 0) {
                    if (minusculas > 0) {
                        if (mayusculas > 0) {
                            if (especiales > 0) {
                                const datitos=cookies.usuario;
                                const datos = {
                                    carnet: datitos.carnet,
                                    nombre: nombre,
                                    apellido: apellido,
                                    genero: genero,
                                    facultad: facultad,
                                    carrera: carrera,
                                    correo: correo,
                                    contraseña: contraseña2
                                }
                                fetch(`http://localhost:5000/editar/${carnet}`, {
                                    method: "POST",
                                    body: JSON.stringify(datos),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                    .then((response) => response.json())
                                    .then((res) => {
                                        console.log("Respuesta: " + res)
                                        alert(res.mensaje);
                                    })
                                removeCookie('usuario');
                                setCookie('usuario', datos);
                                navigate('/home');
                            } else {
                                alert('Su contraseña no posee caracteres especiales');
                            }
                        } else {
                            alert('Su contraseña no posee mayúsculas');
                        }
                    } else {
                        alert('Su contraseña no posee minúsculas');
                    }
                } else {
                    alert('Su contraseña no posee números');
                }
            } else {
                alert('Las contraseñas no concuerdan');
            }
        } else {
            alert('La contraseña debe tener un mínimo de 8 caracteres');
        }
    }




    return (
        <div className="login-background">
            <div className='row align-items-center h-100 justify-content-center'>

                <div className="card" style={{ width: '55rem' }}>
                    <div className="card-body">
                        <h1 className="card-title text-center">Editar Datos</h1>

                        <form className="row g-3" onSubmit={actualizarDatos}>
                            <div className="col-md-4">
                                <label htmlFor="validationDefault01" className="form-label">Ingrese sus nuevos nombre</label>
                                <input type="text" id="validationDefault01" onChange={(e) => setNombre(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Ingrese sus nuevos apellidos</label>
                                <input type="text" onChange={(e) => setApellido(e.target.value)} className="form-control" id="validationDefault02" required></input>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Ingrese su nueva dirección de correo electrónico</label>
                                <input type="email" onChange={(e) => setCorreo(e.target.value)} className="form-control" id="validationDefault03" required></input>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Escoja su nuevo género</label>
                                <select className="form-select" onChange={(e) => setGenero(e.target.value)} id="validationDefault04" required>
                                    <option selected disabled value="">Escoger...</option>
                                    <option>Femenino</option>
                                    <option>Masculino</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Ingrese su nueva facultad</label>
                                <input type="text" className="form-control" onChange={(e) => setFacultad(e.target.value)} id="validationDefault01" required></input>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Ingrese su nueva carrera</label>
                                <input type="text" className="form-control" onChange={(e) => setCarrera(e.target.value)} id="validationDefault02" required></input>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Ingrese su nueva contraseña</label>
                                <input type="password" onChange={(e) => setContraseña1(e.target.value)} className="form-control" id="validationDefault01" required></input>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Confirme su nueva contraseña</label>
                                <input type="password" onChange={(e) => setContraseña2(e.target.value)} className="form-control" id="validationDefault02" required></input>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 carácter especial</label>
                            </div>
                            <div className="col-12">
                            </div>
                            <div className="col-12">
                                <div className="row justify-content-center">
                                    <button className="btn btn-primary " type="submit" >Actualizar Datos</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

