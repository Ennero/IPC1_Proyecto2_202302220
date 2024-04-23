import './Styles/Inicio.css';
import React, { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export const CrearPost = () => {


    const [descripcion, setDescripcion] = useState("")
    const [categoria, setCategoria] = useState("");
    const [anonimo, setAnonimo] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [imagen, setImagen] = useState("");
    const [base64, setBase64] = useState("");
    const navigate = useNavigate();

    const logout = () => {
        removeCookie('usuario');
        navigate('/inicio')
    }

    const cambiarImagen = (event) => {
        event.preventDefault();
        const doc = event.target.files[0];
        if (doc) {
            const lector = new FileReader();
            lector.onload = () => {
                setImagen(URL.createObjectURL(doc));
                setBase64(lector.result)
            };
            lector.readAsDataURL(doc)
        }
    }

    const guardarPost = () => {
        const usuario = cookies.usuario;
        const fecha = new Date();
        let datos;
        if (anonimo === true) {
             datos = {
                descripcion: descripcion,
                categoria: categoria,
                anonimo: anonimo,
                fecha: fecha,
                imagen: base64,
                nombre: `Usuario Anónimo`,
                carrera: "Universidad San Carlos de Guatemala",
                likes: 0,
                comentarios: [],
                anonimo: anonimo

            }
        } else {
             datos = {
                descripcion: descripcion,
                categoria: categoria,
                anonimo: anonimo,
                fecha: fecha,
                imagen: base64,
                nombre: `${usuario.nombre} ${usuario.apellido}`,
                carnet: usuario.carnet,
                carrera: usuario.carrera,
                facultad: "("+ usuario.facultad + ")",
                likes: 0,
                comentarios: []
            }
        }




        fetch('http://localhost:5000/home', {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json",
            },
        })

            .then((response) => response.json())
            .then((res) => {
                console.log(res.response)
                alert(res.response)
                setDescripcion("")
                setImagen("")
            })
            .catch((error) => console.error(error));
    };

    const check = (event) => {
        setAnonimo(event.target.checked)
    }

    return (
        <Fragment>
            <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "100%", top: "0", backgroundColor: "#00C3FF" }}>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, paddingLeft: "5%" }}>
                    <ul style={{ listStyleType: "none", display: "flex", padding: 0, height: "100%", alignItems: "center", margin: "0px" }}>
                        <li style={{ color: "white", marginRight: "35px" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/home">
                                Inicio
                            </Link>
                        </li>
                        <li style={{ color: "white" }}>
                            <Link style={{ color: "white", textDecoration: "none" }} to="/crearPost">
                                Crear Publicación
                            </Link>
                        </li>
                    </ul>

                </div>
                <div style={{ display: "flex", alignItems: "center", height: "10vh", width: "50%", top: 0, flexDirection: "row-reverse", paddingRight: "5%" }}>
                    <button className="btn btn-danger " onClick={logout}>
                        Salir
                    </button>
                </div>
            </div>
            <form onSubmit={guardarPost}>
                <div style={{ display: "flex", alignItems: "center", height: "90vh", width: "100%", top: "10", paddingBottom: "5%", paddingTop: "5%" }}>
                    <div className="container-fluid h-100" style={{ marginRight: "20%", marginLeft: "20%", borderRadius: "25px", backgroundColor: "#00C3FF", display: "flex", padding: "5%", color: "white", flexDirection: "column" }}>
                        <div className='d-flex justify-content-center'>
                            <h1>NUEVA PUBLICACIÓN</h1>
                        </div>
                        <h3>Descripción</h3>
                        <div class="mb-3">
                            <label class="form-label">Example textarea</label>
                            <textarea class="form-control" rows="3" required onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Escoja la categoria de la publicación</label>
                            <select className="form-select" onChange={(e) => setCategoria(e.target.value)} required>
                                <option selected disabled value="">Escoger...</option>
                                <option>Anuncio Importante</option>
                                <option>Divertido</option>
                                <option>Académico</option>
                                <option>Variedades</option>
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={check} checked={anonimo}></input>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Publicar en anónimo
                            </label>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "5%", flexDirection: "column" }}>
                            <label htmlFor="file-upload" className="btn btn-warning" style={{ fontSize: "19px", width: "100%", height: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16" style={{ marginRight: "1%" }}>
                                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
                                </svg>
                                {" Escoger una imagen"}
                            </label>
                            <input onChange={cambiarImagen} id="file-upload" type="file" accept="image/*" style={{ display: "none" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "30rem", height: "35%", marginTop: "5%" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", maxHeight: "30rem", maxWidth: "25rem" }}>
                                {imagen && <img src={imagen} alt="Selected" style={{ objectFit: "cover", width: "22rem", height: "12rem" }} />}
                            </div>
                        </div>
                        <div style={{ width: "100%", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button type="submit" className="btn btn-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                </svg>
                                {"Publicar"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

