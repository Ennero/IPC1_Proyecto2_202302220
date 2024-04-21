import React, { useState } from 'react';
import './Styles/Inicio.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export const Inicio = () => {
  //Aquí solo ando creando las variables y las galletitas:)
  const [carnet, setCarnet] = useState('');
  const [contraseña, setContraseña] = useState('');

  const [cookies, setCookie] = useCookies(['usuario']);
  const navigate = useNavigate();

  //Toda esta función servirá para la comunicación con el backend
  const ingresoDatos = (evento) => {
    evento.preventDefault();
    //Le ingreso los valores a las variables
    const datos = {
      carnet: parseInt(carnet, 10),
      contraseña: contraseña
    }

    fetch('http://localhost:5000/inicio', {
  method: "POST",
  body: JSON.stringify(datos),
  headers: {
    "Content-Type": "application/json",
  },
})
      .then((response) => response.json())//parseamos la respuesta a json
      .then((res) =>{
        console.log("Respuesta: " + res)
        if (res.success){
          const datosUsuario=res.user
          alert(`Bienvenido ${datosUsuario.nombre} ${datosUsuario.apellido}`)
          setCookie('usuario', datosUsuario);
          navigate('/home')//Recordar que esta será la dirección de donde colocaré TODOOOO
        }else{
          alert('Carnet o contraseña incorrectos')
        }
        setCarnet("");
        setContraseña("")
      })
      .catch((error) => console.error(error));


  }


  //Aquí va la parte visual
  return (
    <div className="login-background">
      <div className="card mb-3" >
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="card border-0" style={{ width: '12rem' }}>
              <img src="./R.png" className="card-img-top" alt="..."></img>
            </div>
          </div>
          <h1 className="card-title fw-bold text-center">USocial</h1>
          <p className="text-center"> T<b>u</b> red <b>social</b> donde puedes compartir t<b>u</b>s ideas y opiniones con toda t<b>u</b> libertad </p>
        </div>
      </div>
      <div className="row justify-content-center mb-3">
        <div className="card" style={{ width: '27rem' }}>
          <h4 className="text-center fw-bold card-title mt-2 mb-2">Inicio de Sesión</h4>


          <form onSubmit={ingresoDatos} className='form-signin w-100 m-auto'>
        <div className="form-floating mb-1">
          <input type="number" className="form-control" id="floatingInput" placeholder="202302220" onChange={(e)=> setCarnet(e.target.value)} value={carnet}></input>
          <label htmlFor="floatingInput">Número de Carnet / Código USAC</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setContraseña(e.target.value)} value={contraseña}></input>
          <label htmlFor="floatingPassword">Contraseña</label>
        </div>
        <button type="submit" className="btn btn-info mb-2 mt-2" onClick={ingresoDatos}>Iniciar Sesión</button>
            <div className="card border-0">
              <p className="text-center">¿Aún no tienes una cuenta? <a href="/registro" className="card-link">Crear una Cuenta</a></p>
            </div>
          </form>


        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0 ">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">Acerca de</h5>
              <p className="card-text">Esta página recopila datos del usuario para la generación de las publicaciones.
                Esta página está creada sobre un un portocolo web poco seguro, pueda estar expuesto a posibles perdidas de la información o ataques
                que atenten contra la privacidad del usuario. Página web creada sobre nodeJS con React como framework por <b>ENNER ESAÍ MENDIZABAL CASTRO</b>,
                estudiante de segundo año de Ingenieria en Ciencias y Sistemas en la Tricentenaria <b>Universidad San Carlos de Guatemala</b></p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Información de Contacto</h5>
              <p className="card-text">Ante cualquier <b>duda, problema o sugerencia</b> que se pueda tener en la publicación, ingreso, registro o en cualquier proceso relacionado
                con esta página, contactar al <b>+502 4477-7547</b> o escribir a algunos de los siguientes correos: <b> enneresaemen@gmail.com</b> o
                <b> 2895884051401@Ingenieria.usac.edu.gt</b> se responderá dentro de los próximos 5 días hábiles</p>
            </div>
          </div>
        </div>

      </div>


    </div>
  );

}