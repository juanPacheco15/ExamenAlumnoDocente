import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase";

function App() {
  const navigate = useNavigate();
  var dbReferencia = db.ref("Alumno");

  function inicia() {
    var nameUser = document.getElementById("nameUser").value;
    var pass = document.getElementById("password").value;

    dbReferencia.on(
      "value",
      function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var data1 = childSnapshot.key;
          var data = childSnapshot.val();
          if (data.usuario == nameUser && data.constrasenia == pass) {
            isDocente(data.tipousuario, data1);
          }
        });
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );
  }

  function isDocente(tipo, id) {
    localStorage.setItem("user", JSON.stringify(id));
    if (tipo == "alumno") {
      navigate("/rAlumno");
    }
    if (tipo == "maestro") {
      navigate("/rMaestro");
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="titulo">Taller de Programacion Web</h1>
      <div className="row d-flex justify-content-center align-items-center vh-85">
        <div className="col-12 col-md-4 bg-white rounded-1 shadow-lg p-4">
          <div className="mb-3">
            <label htmlFor="nameUser" className="form-label">
              Nombre de usuario:
            </label>
            <input type="text" className="form-control" id="nameUser" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="d-grid mb-3">
            <button onClick={inicia} className="btn btn-primary">
              Iniciar sesión
            </button>
          </div>

          <div className="d-flex flex-column text-center">
            <Link to="/Registra" className="btn btn-primary">
              Registra
            </Link>

            <span>
              <b>INTEGRANTES DEL EQUIPO:</b>
            </span>
            <span>IMANOL MARIANITO CUAHUITIC</span>
            <span>ANA LAURA RAMIREZ CABRERA</span>
            <span>ALEXIS EDUARDO HIPOLITO LOAEZA</span>
            <span>JUAN ENRIQUE PACHECO GONZALEZ</span>
            <span>FRANCISCO JAVIER SANCHEZ ZARAGOZA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
