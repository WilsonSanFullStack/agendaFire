import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/vistas/Home";
import ActualizarUser from "./components/formularios/ActualizarUser";
import Inicio from "./components/vistas/Inicio";
import Sesion from "./components/formularios/Sesion";
import NavBar from "./components/resources/NavBar";
import RegistroClientes from "./components/formularios/RegistroClientes";
import Registro from "./components/formularios/Registro";
import Verificacion from "./components/vistas/Verificacion";
import RegistroPagina from "./components/formularios/RegistrarPagina";
import { NotFound } from "./components/resources/NotFound";
import { Estafador } from "./components/vistas/Estafador";
import RegistroEstafadores from "./components/formularios/RegistroEstafadores";

function App() {
  const location = useLocation();

  // rutas donde la Navbar  no deberia aparecer
  const excludeNavPaths = ["/", "/registro", "/sesion", "/verificacion", '/404'];
  return (
    <div className="">
      {!excludeNavPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/verificacion" element={<Verificacion />} />
        <Route path="/actualizar" element={<ActualizarUser />} />
        <Route path="/clientes" element={<RegistroClientes />} />
        <Route path="/pagina" element={<RegistroPagina />} />
        <Route path="/estafadores" element={<Estafador />} />
        <Route path="/estafador" element={<RegistroEstafadores />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
