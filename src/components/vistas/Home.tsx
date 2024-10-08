import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  deleteCliente,
  getClientes,
  getClientesBuscar,
  getClientesPag,
} from "../../redux/actions/clientes";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/reducer/index";
import { TiZoomOutline } from "react-icons/ti";
import { getPagina } from "../../redux/actions/pagina";
import debounce from "lodash.debounce";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const clientes = useSelector(
    (state: RootState) => state.clientes.getClientes
  );
  const paginas = useSelector((state: RootState) => state.pagina.pagina);
  const getUserById = useSelector((state: RootState) => state.user.user);
  const [pagina, setPagina] = useState(false);

  useEffect(() => {
    dispatch(getPagina());
    if (getUserById !== null && Array.isArray(getUserById) === false) {
      dispatch(getClientes(getUserById?.userName));
    }
  }, [getUserById]);

  const handleEliminar = (eliminar: string) => {
    dispatch(deleteCliente(eliminar));
    if (getUserById !== null && Array.isArray(getUserById) === false) {
      dispatch(getClientes(getUserById?.userName));
    }
  };

  const handleGetUserByPag = (pag: string) => {
    if (getUserById !== null && Array.isArray(getUserById) === false) {
      dispatch(
        getClientesPag({ userName: getUserById?.userName, pagina: pag })
      );
    }
  };
  const [nick, setNick] = useState("");
  const handleBuscar = useCallback(
    debounce((nick) => {
      if (getUserById !== null && Array.isArray(getUserById) === false) {
        dispatch(
          getClientesBuscar({ userName: getUserById?.userName, nick: nick })
        );
      }
    }, 300),
    [getUserById, dispatch]
  );
  const handleNick = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNick(value);
    handleBuscar(value);
  };
  return (
    <div className="text-center items-center p-2 min-h-screen  pt-12">
      <nav className="px-10 min-w-full bg-slate-500">
        <ul className="flex list-none justify-between items-center h-9 ">
          <li className="inline-block items-center">
            <button
              onClick={() => setPagina(!pagina)}
              className="uppercase border-2  active:border-2 hover:bg-green-600 active:bg-blue-500 hover:border-2 border-slate-950 rounded-lg px-1"
            >
              pagina
            </button>
            <div
              onMouseLeave={() => setPagina(!pagina)}
              className={`${
                pagina ? "block" : "hidden"
              } absolute bg-white shadow-lg rounded-lg mt-1 w-auto h-auto z-10 p-2 text-black`}
            >
              <ul>
                {paginas !== null &&
                  paginas.map((pag, x) => {
                    return (
                      <li
                        key={x + 1}
                        className=" cursor-pointer m-0.5 hover:bg-gray-300"
                        onClick={() => handleGetUserByPag(pag.pagina)}
                      >
                        {pag.pagina}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </li>

          <li
            className="flex items-center"
            // onChange={handleBuscar}
          >
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={nick}
              name="userName"
              onChange={handleNick}
              className="text-black font-bold text-center border-gray-600 border-2 "
            />
            <TiZoomOutline className="text-black text-3xl" />
          </li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
        {clientes?.map((clientes, x) => {
          const milliseconds =
            (clientes?.fechaRegistro?.seconds ?? 0) * 1000 +
            (clientes?.fechaRegistro?.nanoseconds ?? 0) / 1000000;
          const date = new Date(milliseconds);
          return (
            <div
              key={x + 1}
              className="relative group items-center justify-center overflow-hidden cursor-pointer w-56 h-64 border rounded-lg"
            >
              {/* Parte frontal de la tarjeta */}
              <div className="relative w-full h-full bg-gray-800 text-white shadow-lg rounded-lg group-hover:rotate-y-180 transition-transform duration-500 ease-in-out">
                <div className="p-4 grid grid-cols-2 gap-2">
                  <p>Nick:</p>
                  <p>{clientes?.userName}</p>
                  <p>Nombre:</p>
                  <p>{clientes?.nombre}</p>
                  <p>Página:</p>
                  <p>{clientes?.pagina}</p>
                  <p>Edad:</p>
                  <p>{clientes?.edad}</p>
                  <p>País:</p>
                  <p>{clientes?.nacionalidad}</p>
                  <p>Registrado:</p>
                  {date && <p>{date?.toLocaleString()}</p>}
                </div>
              </div>

              {/* Parte trasera de la tarjeta */}
              <div className="absolute inset-0 bg-gradient-to-b from-inherit via-current to-black">
                <div className="absolute bg-gray-900 inset-0 flex flex-col  text-center translate-y-[90%] group-hover:translate-y-0 transition-all">
                  <h2 className="top-0 mb-2">Comentarios</h2>
                  <section className=" overflow-auto bg-slate-800 mb-8">
                    {clientes?.comentarios}
                  </section>
                  <section className="absolute bottom-0 w-full flex justify-between px-4 m-0.5">
                    <button
                      onClick={() => handleEliminar(clientes.userName)}
                      className="uppercase border border-white px-0.5 hover:rounded-lg"
                    >
                      eliminar
                    </button>
                    <button className="uppercase border border-white px-0.5 hover:rounded-lg">
                      editar
                    </button>
                  </section>
                </div>
              </div>
            </div>
          );
        })}
        {clientes?.length === 0 && (
          <div className="uppercase text-2xl text-center" >
            <p>no hay Clientes para mostrar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
