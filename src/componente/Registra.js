import { db } from '../firebase';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';
function agregar(){

    const nombre=document.getElementById('nombre').value;
    const sexo=document.getElementById('sexo').value;
    const tipousuario=document.getElementById('tipousuario').value;
    const contrasenia=document.getElementById('contrasenia').value;
    const usuario=document.getElementById('usuario').value;
    
    let alumno={
      nombre:nombre,
      sexo:sexo,
      tipousuario:tipousuario,
      constrasenia:contrasenia,
      usuario:usuario
    };
    
    const newReferencia=db.ref("/Alumno").push();
    
    if (nombre===""&& sexo===""&&tipousuario===""&&contrasenia===""&&usuario==="") {
      alert('datos vacios porfavor llena todos los campos');
      <Link className="btn btn-danger me-3" to="/Registra"/>
    }else{
      newReferencia.set({
        nombre:alumno.nombre,
        sexo:alumno.sexo,
        tipousuario:alumno.tipousuario,
        constrasenia:alumno.constrasenia,
        usuario:alumno.usuario
      }).then(()=>{
        alert("datos agregados") 
      });
       
    }
    }

function Registra() {
    return(
        <>
        <div className='container'>
          <div className="offset-2 col-8 bg-white p-4 rounded-1 shadow-lg">
          <h5 id="exampleModalLabel">Agregar</h5>
            <div>
              <form>
                <div className='form-group'>
                  <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                  <input type="text" className="form-control" id='nombre' name="nombre" placeholder='Nombre'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="recipient-name" className="col-form-label">Nombre Usuario</label>
                  <input type="text" className="form-control" id='usuario' name="usuario" placeholder='usuario'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="recipient-name" className="col-form-label">Contrasenia</label>
                  <input type="password" className="form-control" id='contrasenia' name="contraseña" placeholder='contraseña'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="recipient-name" className="col-form-label">Sexo</label>
                  <input type="text" className="form-control" id='sexo' name="sexo" placeholder='sexo'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="recipient-name" className="col-form-label">Tipo de Usuario</label>
                  <input type="text" className="form-control" id='tipousuario' name="tipousuario" placeholder='tipousuario'/>
                </div>
                
                <div className="mt-3 d-flex justify-content-end">
                  <Link className="btn btn-danger me-3" to="/">Regresar</Link>
                  <Link className="btn btn-primary me-3" to="/Registra" onClick={agregar}>Enviar</Link>
                  
                </div>
              </form>
            </div>
          </div>
        </div>            
        </>
    )    
}
export default Registra