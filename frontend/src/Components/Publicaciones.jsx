import './Styles/Inicio.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Publicaciones() {

    const [publicaciones, setPublicaciones] = useState([]);
    const [escogerPublicacion, setEscogerPublicacion] = useState(null);
    const [validarEliminacion, setValidarEliminacion] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/home', {
            method: "GET",
        })
            .then((response) => response.json())
            .then((res) => {
                setPublicaciones(res);
            })
            .catch((error) => console.error(error));
        console.log(publicaciones)
    }, [validarEliminacion]);

    const borrarPublicacion = (ID) => {// esto es lo de eliminar
        fetch(`http://localhost:5000/home/${ID}`, {
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
            .catch(error => console.error("No se pudo eliminar la publicación:", error));
    };
    const cerrar = () => {
        setEscogerPublicacion(null);
    };
    const verPublicacion = (publicacion) => {
        setEscogerPublicacion(publicacion);
    };
    const logout = () => {
        removeCookie('usuario');
        navigate('/inicio')
    }

    const subirDatos = (event) => {//no sirve
        event.preventDefault();
        var docu;
        const doc = event.target.files[0];
        if (doc) {
            const lecto = new FileReader();
            lecto.onload = () => {
                docu(lecto.result)
            }
            fetch('http://localhost:5000/registro', {
                method: "POST",
                body: JSON.stringify(docu),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log("Respuesta: " + res)
                    if (res.sucess) {
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
                            <Link style={{ color: "white", textDecoration: "none" }} to="/admin">
                                Usuarios
                            </Link>
                        </li>
                        <li style={{ color: "white" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/publicaciones">
                                Publicaciones
                            </Link>
                        </li>
                        <li style={{ color: "white" }} className="ml-3">
                            <button className="btn btn-success " onClick={subirDatos}>
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
                                    <th>ID</th>
                                    <th>Categoría</th>
                                    <th>Nombre</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publicaciones && publicaciones?.map(publicacion => (
                                    <tr key={publicacion.id}>
                                        <td>{publicacion.id}</td>
                                        <td>{publicacion.categoria}</td>
                                        <td>{publicacion.nombre}</td>
                                        <td>{publicacion.fecha}</td>
                                        <td>
                                            <button className="btn btn-outline-danger" onClick={() => borrarPublicacion(publicacion.id)} style={{ marginRight: "5%" }}>
                                                Eliminar
                                            </button>
                                            <button className="btn btn-outline-warning" onClick={() => verPublicacion(publicacion)}>Ver Más</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {escogerPublicacion && (
                            <Modal show={true} onHide={cerrar}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Más detalles de la publicacion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p><strong>ID:</strong> {escogerPublicacion.id}</p>
                                    <p><strong>Nombre:</strong> {escogerPublicacion.nombre}</p>
                                    <p><strong>Categoria:</strong> {escogerPublicacion.categoria}</p>
                                    <p><strong>Anonimo:</strong> {escogerPublicacion.anonimo}</p>
                                    <p><strong>Facultad:</strong> {escogerPublicacion.facultad}</p>
                                    <p><strong>Carrera:</strong> {escogerPublicacion.carrera}</p>
                                    <p><strong>Likes:</strong> {escogerPublicacion.likes}</p>
                                    <p><strong>Descripcion:</strong> {escogerPublicacion.descripcion}</p>
                                    <p><strong>Imagen:</strong></p>
                                    <img className="card-img-top" src={escogerPublicacion.imagen} alt="Card image cap" />
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

