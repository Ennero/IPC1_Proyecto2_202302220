import React from 'react';
import './Styles/Inicio.css';


export const Inicio = () => {
  return (
    <div class="login-background">
      <div class="card mb-3" >
        <div class="card-body">
          <div class="row justify-content-center">
            <div class="card border-0" style={{ width: '12rem' }}>
              <img src="./R.png" class="card-img-top" alt="..."></img>
            </div>
          </div>
          <h1 class="card-title fw-bold text-center">USocial</h1>
          <p class="text-center"> T<b>u</b> red <b>social</b> donde puedes compartir tus ideas y opiniones con toda t<b>u</b> libertad </p>
        </div>
      </div>

      <div class="row justify-content-center mb-3">
        <div class="card" style={{ width: '27rem' }}>
          <h4 class="text-center fw-bold card-title mt-2 mb-2">Inicio de Sesión</h4>
          <div class="form-floating mb-1">
            <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
              <label for="floatingInput">Número de Carnet / Código USAC</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
              <label for="floatingPassword">Contraseña</label>
          </div>
          <a href="#" class="btn btn-info mb-2 mt-2">Iniciar Sesión</a>
          <div class="card border-0">
            <p class="text-center">¿Aún no tienes una cuenta? <a href="#" class="card-link">Crear una Cuenta</a></p>
          </div>
        </div>
      </div>
      
      <div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Acerca de</h5>
        <p class="card-text">Esta página recopila datos del usuario para la generación de las publicaciones.
         Esta página está creada sobre un un portocolo web poco seguro, pueda estar expuesto a posibles perdidas de la información o ataques
         que atenten contra la privacidad del usuario. Página web creada sobre nodeJS con React como framework por <b>ENNER ESAÍ MENDIZABAL CASTRO</b>,
         estudiante de segundo año de Ingenieria en Ciencias y Sistemas en la Tricentenaria <b>Universidad San Carlos de Guatemala</b></p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Información de Contacto</h5>
        <p class="card-text">Ante cualquier <b>duda, problema o sugerencia</b> que se pueda tener en la publicación, ingreso, registro o en cualquier proceso relacionado
        con esta página, contactar al <b>+502 4477-7547</b> o escribir a algunos de los siguientes correos: <b> enneresaemen@gmail.com</b> o   
        <b> 2895884051401@Ingenieria.usac.edu.gt</b> se responderá dentro de los próximos 5 días hábiles</p>
      </div>
    </div>
  </div>
  
</div>


    </div>
  );
}