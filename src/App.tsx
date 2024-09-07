import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import ActualizarUser from "./components/ActualizarUser";
import Inicio from "./components/Inicio";
import Sesion from "./components/Sesion";
import NavBar from "./components/NavBar";
import RegistroClientes from "./components/RegistroClientes";
import Registro from "./components/Registro";
import Verificacion from "./components/Verificacion";



function App() {
  const location = useLocation();
  // rutas donde la Navbar  no deberia aparecer
  const excludeNavPaths = ["/", "/registro", "/sesion" , "/verificacion"];
  return (
    <div className="">
      {!excludeNavPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/sesion" element={<Sesion />} />
        <Route path="/verificacion" element={<Verificacion />} />
        
        <Route path="/clientes" element={<RegistroClientes />} />
      </Routes>
    </div>
  );
}

export default App;
