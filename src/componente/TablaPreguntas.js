import { db } from "../firebase";
import React, { Component } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

var referenciaPreguntas = db.ref("Preguntas");

class TablaPreguntas extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form: {
      pregunta: "",
      opciona: "",
      opcionb: "",
      opcionc: "",
      respuesta: "",
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

  //PUT
  peticionPut = () => {
    referenciaPreguntas.child(this.state.id).set(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalEditar: false });
  };

  //POST
  peticionPost = () => {
    referenciaPreguntas.push(this.state.form, (error) => {
      if (error) console.log(error);
    });
    this.setState({ modalInsertar: false });
  };

  //ELIMINAR
  peticionDelete = () => {
    if (
      window.confirm(
        `Estás seguro que deseas eliminar el canal ${
          this.state.form && this.state.form.canal
        }?`
      )
    ) {
      referenciaPreguntas
        .child(`preguntas/${this.state.id}`)
        .remove((error) => {
          if (error) console.log(error);
        });
    }
  };

  //CAMBIAR
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };
  //SELECCION CANAL
  seleccionarCanal = async (canal, id, caso) => {
    await this.setState({ form: canal, id: id });

    caso === "Editar"
      ? this.setState({ modalEditar: true })
      : this.peticionDelete();
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
      <div className="panelpre">
        <Link class="btn btn-dark" to="/PanelMaestro">
          Regresar
        </Link>
        <button
          className="btn btn-success"
          onClick={() => this.setState({ modalInsertar: true })}
        >
          Insertar
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Opcion A</th>
              <th>Opcion B</th>
              <th>Opcion C</th>
              <th>Correcta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map((i) => {
              return (
                <tr key={i}>
                  <td>{this.state.data[i].pregunta}</td>
                  <td>{this.state.data[i].opciona}</td>
                  <td>{this.state.data[i].opcionb}</td>
                  <td>{this.state.data[i].opcionc}</td>
                  <td>{this.state.data[i].respuesta}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        this.seleccionarCanal(this.state.data[i], i, "Editar")
                      }
                    >
                      Editar
                    </button>{" "}
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.seleccionarCanal(this.state.data[i], i, "Eliminar")
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>Insertar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Pregunta: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pregunta"
                onChange={this.handleChange}
              />
              <br />
              <label>Opcion A: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="opciona"
                onChange={this.handleChange}
              />
              <br />
              <label>Opcion B: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="opcionb"
                onChange={this.handleChange}
              />
              <br />
              <label>Opcion C: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="opcionc"
                onChange={this.handleChange}
              />
              <br />
              <label>Respuesta: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="respuesta"
                onChange={this.handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalInsertar: false })}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>Editar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Pregunta: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="pregunta"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.pregunta}
              />
              <br />
              <label>Opcion A: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="opciona"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.opciona}
              />
              <br />
              <label>Opcion B: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="opcionb"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.opcionb}
              />
              <br />
              <label>Opcion C: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="opcionc"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.opcionc}
              />
              <br />
              <label>Respuesta Correcta: </label>
              <br />
              <input
                type="text"
                className="form-control"
                name="respuesta"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.respuesta}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.peticionPut()}
            >
              Editar
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ modalEditar: false })}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TablaPreguntas;
