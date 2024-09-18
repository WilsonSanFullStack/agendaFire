import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSession } from "../../redux/actions/session";
import { Dispatch } from "redux";
import { auth } from "../../firebase/auth";
import { useEffect, useState } from "react";
import { getUserByUID } from "../../redux/actions/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/index";
import { deleteError } from "../../redux/actions/deleteError";
import { getEstafadores } from "../../redux/actions/estafadores";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownRegistro, setDropdownRegistro] = useState(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const errorAxios = useSelector(
    (state: RootState) => state.errorAxios.errorAxios
  );
  const getUserById = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(deleteError());
  }, [user]);

  useEffect(() => {
    const act = async () => {
      await auth.updateCurrentUser(auth.currentUser);
    };
    act();
    if (typeof user === "string") {
      if (typeof auth.currentUser?.uid === "string") {
        setUser(auth.currentUser?.uid);
      }
    }
  }, [user]);

  const handleLogout = async () => {
    dispatch(postSession());
    navigate("/");
  };

  useEffect(() => {
    if (
      typeof auth.currentUser?.uid === "string" &&
      user === auth.currentUser?.uid
    ) {
      dispatch(getUserByUID(user));
    }
  }, [user]);

  useEffect(() => {
    if (
      errorAxios?.message ===
      "No se encontró el usuario con el UID proporcionado."
    ) {
      navigate("/actualizar");
    }
  }, [errorAxios, getUserById]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!user); // Si el usuario está autenticado, cambia el estado
    });

    return () => unsubscribe(); // Limpia el listener cuando se desmonta el componente
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <nav className="px-10 fixed top-0 min-w-full">
      <ul className="flex list-none justify-between items-center h-9 opacity-20 hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <Link to={"/home"}>
          <li className="inline-block items-center">
            <button className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500 hover:border-2 border-slate-950 rounded-lg px-1">
              home
            </button>
          </li>
        </Link>
        <Link to={"/estafadores"}>
          <li className="inline-block items-center">
            <button className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500  hover:border-2 border-slate-950 rounded-lg px-1">
              estafadores
            </button>
          </li>
        </Link>

        <li className="inline-block items-center">
          {!dropdownRegistro && (
            <button
              onClick={() => setDropdownRegistro(!dropdownRegistro)} // Toggle dropdown
              className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500  hover:border-2 border-slate-950 rounded-lg px-1"
            >
              registro
            </button>
          )}
          {/* Dropdown menu */}
          <div
            onMouseLeave={() => setDropdownRegistro(!dropdownRegistro)}
            className={`${
              dropdownRegistro ? "block" : "hidden"
            }   bg-white shadow-lg rounded-lg mt-24 w-28 z-10 p-2 text-black`}
          >
            <ul className="text-center text-xs">
              <Link to={"/clientes"}>
                <li className=" p-2 hover:bg-gray-200">
                  <button className="w-full text-center">Cliente</button>
                </li>
              </Link>

              <Link to={"/pagina"}>
                <li className="p-2 hover:bg-gray-200">
                  <button className="w-full text-center">Pagina</button>
                </li>
              </Link>
              <Link to={"/estafador"}>
                <li className="p-2 hover:bg-gray-200">
                  <button className="w-full text-center">Estafador</button>
                </li>
              </Link>
              {/* Aquí puedes agregar más opciones si deseas */}
            </ul>
          </div>
        </li>

        <li className="relative">
          {!dropdownOpen && (
            <button
              className="uppercase border-2 hover:bg-green-600 active:bg-blue-500 border-slate-950 rounded-lg px-2"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
              // Toggle dropdown
            >
              {getUserById !== null && Array.isArray(getUserById) === false
                ? getUserById.userName
                : "Update"}
            </button>
          )}

          {/* Dropdown menu */}
          <div
            onMouseLeave={() => setDropdownOpen(!dropdownOpen)}
            className={`${
              dropdownOpen ? "block" : "hidden"
            } bg-white shadow-lg rounded-lg mt-2 w-28 z-10 text-black`}
          >
            <ul className="text-center text-xs">
              <li className="p-2 hover:bg-gray-100">
                <button onClick={handleLogout} className="w-full text-center">
                  Cerrar sesión
                </button>
              </li>
              {/* Aquí puedes agregar más opciones si deseas */}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
