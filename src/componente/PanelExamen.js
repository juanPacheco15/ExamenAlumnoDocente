import { db, doc } from "../firebase";
import React, { Component } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { $ } from "jquery";

var referenciaPreguntas = db.ref("Preguntas");
var nombreUs = "";
var llaveUsuario = "";
var cantCorrectas = 0;
var promedio = 0;
var cantPreguntas = 0;

//OBTENER-USUARIO
function obtenerDat() {
  var storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
  llaveUsuario = storedUser;

  var dbReferencia = db.ref("Alumno");

  dbReferencia.on(
    "value",
    function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        if (key == storedUser) {
          nombreUs = data.nombre;
          console.log(data.nombre);
        }
      });
    },
    function (error) {
      console.log("Error: " + error.code);
    }
  );
}

class PanelExamen extends Component {
  state = {
    data: [],
    form: {
      pregunta: "",
      opciona: "",
      opcionb: "",
      opcionc: "",
      respuesta: "",
    },
    values: {
      seleccionarOpcion: "",
    },
    validations: {
      seleccionarOpcion: "",
    },
    id: 0,
  };

  //OBTENER
  peticionGet = () => {
    referenciaPreguntas.on("value", (pregunta) => {
      if (pregunta.val() !== null) {
        this.setState({ ...this.state.data, data: pregunta.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const values = JSON.stringify(this.state.values);
    alert(values);
  };

  //SELECCION CANAL

  componentDidMount() {
    this.peticionGet();
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  render() {
    obtenerDat();
    function click() {
      var referenciaResultados = db.ref("/ResultadoExamen").push();
      referenciaPreguntas.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var data = childSnapshot.val();

          var opcion = document.querySelector(
            'input[name="' + String(data.pregunta) + '"]:checked'
          ).value;
          if (opcion != null) {
            if (data.respuesta == opcion) {
              document.getElementById(data.pregunta).style.backgroundColor =
                "green";
              cantCorrectas++;
            } else {
              document.getElementById(data.pregunta).style.backgroundColor =
                "red";
              document.getElementById(data.pregunta).innerHTML =
                "Respuesta Correcta es " + data.respuesta;
              console.log("respuesta  correcta " + data.respuesta);
            }
          } else {
            document.getElementById("enviar").disabled = true;
            document.getElementById("finalizar").disabled = false;
          }
          cantPreguntas++;
        });
      });
      promedio = (cantCorrectas * 10) / cantPreguntas;
      referenciaResultados.set({
        nombre: nombreUs,
        calificacion: promedio,
        llave: llaveUsuario,
      });
      promedio = 0;
      cantPreguntas = 0;
      cantCorrectas = 0;
      console.log(promedio);
    }

    return (
      <div className="panelpre">
        <Link className="btn btn-dark" to="/PanelAlumno">
          Regresar
        </Link>
        <p>USUARIO: {nombreUs}</p>
        <p>LLAVE: {llaveUsuario}</p>
        <table className="table table-bordered" id="tablaPregunta">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map((i) => {
              return (
                <tr key={i}>
                  <td>{this.state.data[i].pregunta}</td>
                  <td id={String(this.state.data[i].pregunta)}>
                    <input
                      type="radio"
                      name={String(this.state.data[i].pregunta)}
                      value={String(this.state.data[i].opciona)}
                    />
                    <label>{String(this.state.data[i].opciona)}</label>
                    <br />
                    <input
                      type="radio"
                      name={String(this.state.data[i].pregunta)}
                      value={String(this.state.data[i].opcionb)}
                    />
                    <label>{String(this.state.data[i].opcionb)}</label>
                    <br />
                    <input
                      type="radio"
                      name={String(this.state.data[i].pregunta)}
                      value={String(this.state.data[i].opcionc)}
                    />
                    <label>{String(this.state.data[i].opcionc)}</label>
                    <br />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Link className="btn btn-primary" to="/PanelAlumno">
          Finalizar
        </Link>

        <button class="btn btn-danger" id="enviar" onClick={click}>
          Enviar
        </button>
      </div>
    );
  }
}

export default PanelExamen;
