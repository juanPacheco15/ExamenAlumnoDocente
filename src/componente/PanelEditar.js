import React, { useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import $ from "jquery";

function datos() {
  var storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);

  var dbReferencia = db.ref("Alumno");

  dbReferencia.on(
    "value",
    function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        if (key == storedUser) {
          $("#nombre").val(data.nombre);
          $("#usuario").val(data.usuario);
          $("#sexo").val(data.sexo);
          $("#tipousuario").val(data.tipousuario);
          $("#contrasenia").val(data.constrasenia);
          console.log(data.nombre);
        }
      });
    },
    function (error) {
      console.log("Error: " + error.code);
    }
  );
}

function click() {
  update(JSON.parse(localStorage.getItem("user")));
}

function update(key) {
  var nombre = document.getElementById("nombre").value;
  var usuario = document.getElementById("usuario").value;
  var contrasenia = document.getElementById("contrasenia").value;
  var tipo = document.getElementById("tipousuario").value;
  var sexo = document.getElementById("sexo").value;
  var dbReferencia = db.ref("Alumno");

  dbReferencia
    .child(key)
    .update({
      nombre: nombre,
      usuario: usuario,
      sexo: sexo,
      tipousuario: tipo,
      constrasenia: contrasenia,
    })
    .then(() => alert("datos Modificados"));
}

const PanelEditar = () => {
  useEffect(() => {
    datos();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="offset-2 col-8 bg-white p-4 rounded-1 shadow-lg">
          <h5 id="exampleModalLabel">Agregar</h5>
          <div>
            <form>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Nombre Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  placeholder="usuario"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Contrasenia
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="contrasenia"
                  name="contraseña"
                  placeholder="contraseña"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Sexo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sexo"
                  name="sexo"
                  placeholder="sexo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">
                  Tipo de Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipousuario"
                  name="tipousuario"
                  placeholder="tipousuario"
                />
              </div>

              <div className="mt-3 d-flex justify-content-end">
                <Link className="btn btn-danger me-3" to="/PanelAlumno">
                  Cancelar
                </Link>
                <Link
                  className="btn btn-primary me-3"
                  to="/PanelAlumno"
                  onClick={click}
                >
                  Editar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelEditar;
