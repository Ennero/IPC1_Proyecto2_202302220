import React, { useState, useEffect, Fragment } from 'react';
import './Styles/Inicio.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [cookie, setCookie, removeCookie] = useCookies(['usuario'])
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:5000/home', {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        setPosts(res.reverse());
      })
      .catch((error) => console.error(error));
  }, [])

  const logout = () => {
    removeCookie('usuario');
    navigate('/inicio')
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
                Crear nueva publicación
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
      <div style={{ height: "auto", width: "100%", top: "10", paddingTop: "5%", paddingRight: "20%", paddingLeft: "20%" }}>
        {
          posts.map((item, index) => (

            <div className="card mb-3 mb-5" key={index}>
              <img className="card-img-top" src={item.imagen} alt="Card image cap" />
              <div className="card-body ">
              <div className="card bg-info" style={{width: '16rem'}} Color="green">
              <h1 className="card-title centered-text">{item.categoria}</h1>
              </div>
                <h3 className="card-title">{item.nombre}</h3>
                <p className='card-title'>{item.carrera} {item.facultad}</p>
                <p className="card-text">{item.descripcion}</p>

              </div>
              <div className='card-footer'>
              <h6>{item.fecha}</h6>
              <p >Likes: {item.likes}</p>
              <p > Comentarios: {item.comentarios}</p>


              </div>
              
            </div>
          ))
        }
      </div>



    </Fragment>
  )
}

