import React from "react";
import { Link } from "react-router-dom";

function PanelAlumno() {
  return (
    <div className="container-fluid">
      <h1 className="titulo">Panel Alumno</h1>
      <div className="row d-flex justify-content-center align-items-center vh-85">
        <div className="col-12 col-md-4 bg-white rounded-1 shadow-lg p-4">
          <div className="d-grid mb-3">
            <Link class="btn btn-danger btn-lg btn-block" to="/">
              Cerrar Sesión
            </Link>
          </div>

          <div className="d-flex flex-column text-center">
            <Link class="btn btn-success" to="/PanelEditar">
              Editar Datos
            </Link>
          </div>
          <br />
          <div className="d-flex flex-column text-center">
            <Link class="btn btn-warning btn-lg btn-block" to="/PanelExamen">
              Examen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAlumno;
