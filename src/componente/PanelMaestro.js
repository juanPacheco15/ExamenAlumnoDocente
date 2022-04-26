import React from "react";
import { Link } from "react-router-dom";

function PanelMaestro() {
  return (
    <div className="container-fluid">
      <h1 className="titulo">Panel Maestro</h1>
      <div className="row d-flex justify-content-center align-items-center vh-85">
        <div className="col-12 col-md-4 bg-white rounded-1 shadow-lg p-4">
          <div className="d-grid mb-3">
            <Link class="btn btn-danger btn-lg btn-block" to="/">
              Cerrar Sesión
            </Link>
          </div>

          <div className="d-flex flex-column text-center">
            <Link class="btn btn-warning btn-lg btn-block" to="/TablaPreguntas">
              Gestion Pregunta
            </Link>
          </div>
          <br />
          <div className="d-flex flex-column text-center">
            <Link class="btn btn-primary btn-lg btn-block" to="/PanelReportes">
              Reportes
            </Link>
          </div>
          <br />
          <div className="d-flex flex-column text-center">
            <Link class="btn btn-success" to="/PanelEditarMaestro">
              Editar Datos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelMaestro;
