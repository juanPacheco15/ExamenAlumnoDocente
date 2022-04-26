import React, { useEffect, Component } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import $ from "jquery";

var listaDatos = [];
var listaIntentos = [];
var listaSuma = [];


var alumnoPromedio = {
  nombre: "",
  calificacion: 0,
};

var alumnoIntentos = {
  nombre: "",
  llave: "",
  intentos: 0,
};



var alumnoSumatoria = {
  llave: "",
  sumaCal: 0,
};

var cont = 1;

function calcularIntentos(alumno) {
  for (let i = 0; i < listaIntentos.length; i++) {
    if (listaIntentos[i].llave == alumno.llave) {
      listaIntentos[i].intentos = Number(listaIntentos[i].intentos) + 1;

      return true;
    }
  }

  return false;
}

function sumatoriaCalificacion(alumnoSumatoria) {
  for (let i = 0; i < listaSuma.length; i++) {
    if (listaSuma[i].llave == alumnoSumatoria.llave) {
      listaSuma[i].sumaCal =
        parseFloat(listaSuma[i].sumaCal) + parseFloat(alumnoSumatoria.sumaCal);

      return true;
    }
  }

  return false;

}



function datos() {
  var storedUser = JSON.parse(localStorage.getItem("user"));
  //console.log(storedUser);

  var dbReferencia = db.ref("ResultadoExamen");

  dbReferencia.on(
    "value",
    function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();

        $("#nombre").val(data.nombre);
        $("#llave").val(data.llave);
        $("#calificacion").val(data.calificacion);

        alumnoIntentos = {
          nombre:data.nombre,
          llave: data.llave,
          intentos: cont,
        };

        alumnoSumatoria = {
          llave: data.llave,
          sumaCal: data.calificacion,
        };

        if (calcularIntentos(alumnoIntentos)) {
        } else {
          listaIntentos.push(alumnoIntentos);
        }

        if (sumatoriaCalificacion(alumnoSumatoria)) {
        } else {
          listaSuma.push(alumnoSumatoria);
        }

        listaDatos.push(data);
      });
    },
    function (error) {
      console.log("Error: " + error.code);
    }
  );

  
}


datos();



const PanelReportes = () => {
  useEffect(() => {}, []);

  return (
    <div className="panelpre">
      <Link class="btn btn-dark" to="/PanelMaestro">
        Regresar
      </Link>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Llave</th>
              <th>Intentos</th>
              <th>Promedio General</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(listaIntentos).map((item) => (
              <tr key={item}>
                <td>{listaIntentos[item].nombre}</td>
                <td>{listaIntentos[item].llave}</td>
                <td>{listaIntentos[item].intentos}</td>
                <td>{(listaSuma[item].sumaCal/listaIntentos[item].intentos).toFixed(2)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Llave</th>
              <th>calificacion</th>
              
            </tr>
          </thead>

          <tbody>
            {Object.keys(listaDatos).map((item) => (
              <tr key={item}>
                <td>{listaDatos[item].llave}</td>
                <td>{listaDatos[item].calificacion.toFixed(2)}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanelReportes;


 listaDatos = [];
 listaIntentos = [];
 listaSuma = [];