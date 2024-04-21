import React, { useState } from 'react';
import './Styles/Inicio.css';
import { useCookies } from 'react-cookie';
import { useAsyncError, useNavigate } from 'react-router-dom';

export const Registro = () => {
  //Las variables de los campos a llenar
  const [carnet, setCarnet] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [facultad, setFacultad] = useState('');
  const [carrera, setCarrera] = useState('');


  const ingresoDatos = (evento) => {
    evento.preventDefault();
  }






  return (
    <div className="login-background">
      <div className='row align-items-center h-100 justify-content-center'>

        <div className="card" style={{ width: '55rem' }}>
          <div className="card-body">
            <h1 className="card-title text-center">Registro de Usuario</h1>



            <form className="row g-3">
              <div className="col-md-4">
                <label for="validationDefault01" className="form-label">Ingrese sus nombres</label>
                <input type="text" className="form-control" id="validationDefault01" required></input>
              </div>
              <div className="col-md-4">
                <label for="validationDefault02" className="form-label">Ingrese sus apellidos</label>
                <input type="text" className="form-control" id="validationDefault02" required></input>
              </div>
              <div className="col-md-4">
                <label for="validationDefaultUsername" className="form-label">Ingrese su número de carnet</label>
                <div className="input-group">
                  <input type="number" className="form-control" id="validationDefault02" aria-describedby="inputGroupPrepend2" required></input>
                </div>
              </div>
              <div className="col-md-6">
                <label for="validationDefault03" className="form-label">Ingrese su dirección correo electrónico</label>
                <input type="email" className="form-control" id="validationDefault03" required></input>
              </div>
              <div className="col-md-3">
                <label for="validationDefault04" className="form-label">Ingrese su género</label>
                <select className="form-select" id="validationDefault04" required>
                  <option selected disabled value="">Escoger...</option>
                  <option>Femenino</option>
                  <option>Masculino</option>
                </select>
              </div>
              <div className="col-md-6">
                <label for="validationDefault01" className="form-label">Ingrese su facultad</label>
                <input type="text" className="form-control" id="validationDefault01" required></input>
              </div>
              <div className="col-md-6">
                <label for="validationDefault02" className="form-label">Ingrese su carrera</label>
                <input type="text" className="form-control" id="validationDefault02" required></input>
              </div>
              <div className="col-md-4">
                <label for="validationDefault01" className="form-label">Ingrese la contraseña</label>
                <input type="password" className="form-control" id="validationDefault01" required></input>
              </div>
              <div className="col-md-4">
                <label for="validationDefault02" className="form-label">Confirme la contraseña</label>
                <input type="password" className="form-control" id="validationDefault02" required></input>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required></input>
                  <label className="form-check-label" for="invalidCheck2">
                    Aceptar los términos y condiciones
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">Registrarse</button>
              </div>
            </form>



          </div>
        </div>




      </div>












    </div>

  );
}