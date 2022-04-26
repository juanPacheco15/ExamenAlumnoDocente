import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registra from "./componente/Registra";
import PanelAlumno from "./componente/PanelAlumno";
import PanelMaestro from "./componente/PanelMaestro";
import TablaPreguntas from "./componente/TablaPreguntas";
import PanelEditar from "./componente/PanelEditar";
import PanelEditarMaestro from "./componente/PanelEditarMaestro";
import PanelExamen from "./componente/PanelExamen";
import PanelReportes from "./componente/PanelReportes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Registra" element={<Registra />} />
      <Route path="PanelAlumno" element={<PanelAlumno />} />
      <Route path="PanelReportes" element={<PanelReportes />} />
      <Route path="PanelMaestro" element={<PanelMaestro />} />
      <Route path="PanelEditar" element={<PanelEditar />} />
      <Route path="PanelEditarMaestro" element={<PanelEditarMaestro />} />
      <Route path="TablaPreguntas" element={<TablaPreguntas />} />
      <Route path="PanelExamen" element={<PanelExamen />} />
      <Route path="/rAlumno" element={<Navigate to="/PanelAlumno" />} />
      <Route path="/rMaestro" element={<Navigate to="/PanelMaestro" />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
