import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSession } from "../redux/actions/session";
import { Dispatch } from "redux";
import { auth } from "../firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserByUID } from "../redux/actions/user";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer/index";
import { deleteError } from "../redux/actions/deleteError";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
  }, []);

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
  }, [errorAxios]);
  return (
    <nav className="px-10 fixed top-0 min-w-full">
      <ul className="flex list-none justify-between items-center h-9 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <Link to={"/home"}>
          <li className="inline-block items-center">
            <button className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500 hover:border-2 border-slate-950 rounded-lg px-1">
              home
            </button>
          </li>
        </Link>
        <Link to={"/home"}>
          <li className="inline-block items-center">
            <button className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500  hover:border-2 border-slate-950 rounded-lg px-1">
              estafadores
            </button>
          </li>
        </Link>
        <Link to={"/home"}>
          <li className="inline-block items-center">
            <button className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500  hover:border-2 border-slate-950 rounded-lg px-1">
              clientes
            </button>
          </li>
        </Link>
        <Link to={"/clientes"}>
          <li className="inline-block items-center">
            <button className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500  hover:border-2 border-slate-950 rounded-lg px-1">
              registro
            </button>
          </li>
        </Link>
        <li className="relative">
          <button
            className="uppercase border-2 hover:bg-green-600 active:bg-blue-500 border-slate-950 rounded-lg px-2 py-1"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
            // Toggle dropdown
          >
            {getUserById !== null && Array.isArray(getUserById) === false
              ? getUserById.userName
              : "Update"}
          </button>

          {/* Dropdown menu */}
          <div
            className={`${
              dropdownOpen ? "block" : "hidden"
            } absolute right-0 bg-white shadow-lg rounded-lg mt-1 w-40 z-10`}
          >
            <ul className="text-left">
              <li className="p-2 hover:bg-gray-100">
                <button onClick={handleLogout} className="w-full text-left">
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
