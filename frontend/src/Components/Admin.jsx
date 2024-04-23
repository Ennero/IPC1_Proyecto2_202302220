import './Styles/Inicio.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// rafce para crearlo con export (el cual igual borro despues xd)
export const Admin = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [escogerUsuario, setEscogerUsuario] = useState(null);
    const [validarEliminacion, setValidarEliminacion] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/usuarios', {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                setUsuarios(res);
            })
            .catch((error) => console.error(error));
        console.log(usuarios)
    }, [validarEliminacion]);

    const borrarUsuario = (carnet) => {// esto es lo de eliminar
        fetch(`http://localhost:5000/usuarios/${carnet}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                alert(res.mensaje)//este es el mensaje del backend
                // Cambiamos el estado de validarEliminacion para que el useEffect se ejecute de nuevo
                setValidarEliminacion(() => !validarEliminacion)
            })
            .catch(error => console.error("No se pudo eliminar el usuario:", error));
    };
    const cerrar = () => {
        setEscogerUsuario(null);
    };
    const verUsuario = (usuario) => {
        setEscogerUsuario(usuario);
    };
    const logout = () => {
        removeCookie('usuario');
        navigate('/inicio')
    }

    const subirDatos = (event) => {//Me quedé con que el botón no servía
        event.preventDefault();
        var docu;
        const doc = event.target.files[0];
        if(doc){
            const lecto=new FileReader();
            lecto.onload=()=>{
                docu(lecto.result)
            }
            fetch('http://localhost:5000/registro',{
                method: "POST",
                body: JSON.stringify(docu),
                headers: {
                  "Content-Type": "application/json",
                },
            })
            .then ((response)=> response.json())
            .then((res)=>{
                console.log("Respuesta: " + res)
                if(res.sucess){
                    alert(res.response)
                }


            })
        }
    }



    return (
        <Fragment>
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#00C3FF" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                    <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/home">
                                Usuarios
                            </Link>
                        </li>
                        <li style={{ color: "white" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/post">
                                Publicaciones       
                            </Link>
                        </li>
                        <li style={{ color: "white" }} className="ml-3">
                            <button className="btn btn-success "  onClick={subirDatos}>
                                Carga Masiva
                            </button>
                        </li>
                    </ul>

                </div>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, flexDirection: "row-reverse", paddingRight: "5%" }}>
                    <button className="btn btn-danger " onClick={logout}>
                        Salir
                    </button>
                </div>
            </div>

            <div className='d-flex justify-content-center'>
                <div style={{ alignItems: "center", height: "90vh", width: "98%", top: "10" }}>
                    <div className="table-container">
                        <table className="table table-bordered text-center">
                            <thead className="table-light">
                                <tr>
                                    <th>Carnet</th>
                                    <th>Correo</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios && usuarios?.map(usuario => (
                                    <tr key={usuario.carnet}>
                                        <td>{usuario.carnet}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>
                                            <button className="btn btn-outline-danger" onClick={() => borrarUsuario(usuario.carnet)} style={{ marginRight: "5%" }}>
                                                Eliminar
                                            </button>
                                            <button className="btn btn-outline-warning" onClick={() => verUsuario(usuario)}>Ver Más</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {escogerUsuario && (
                            <Modal show={true} onHide={cerrar}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Más detalles del Usuario</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p><strong>Carnet:</strong> {escogerUsuario.carnet}</p>
                                    <p><strong>Nombre:</strong> {escogerUsuario.nombre}</p>
                                    <p><strong>Apellido:</strong> {escogerUsuario.apellido}</p>
                                    <p><strong>Genero:</strong> {escogerUsuario.genero}</p>
                                    <p><strong>Facultad:</strong> {escogerUsuario.facultad}</p>
                                    <p><strong>Carrera:</strong> {escogerUsuario.carrera}</p>
                                    <p><strong>Correo:</strong> {escogerUsuario.correo}</p>
                                    <p><strong>Contraseña:</strong> {escogerUsuario.contraseña}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={cerrar}>
                                        Cerrar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Admin
