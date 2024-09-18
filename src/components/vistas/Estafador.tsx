import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/reducer/index";
import {
  deleteEstafador,
  getEstafadorBuscar,
  getEstafadores,
} from "../../redux/actions/estafadores";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

export const Estafador = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const estafadores = useSelector(
    (state: RootState) => state.estafadores.getEstafador
  );
  useEffect(() => {
    dispatch(getEstafadores());
  }, []);
  const [nick, setNick] = useState("");
  const handleBuscar = useCallback(
    debounce((nick: string) => {
      dispatch(getEstafadorBuscar(nick));
    }, 300),
    [dispatch]
  );
  const handleNick = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNick(value);
    handleBuscar(value);
  };
  const handleEliminar = (eliminar: string) => {
    dispatch(deleteEstafador(eliminar))
    dispatch(getEstafadores())
  };
  return (
    <div className="mt-24">
      <h1 className="text-center text-2xl uppercase font-bold">Estafadores</h1>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={nick}
          name="userName"
          onChange={handleNick}
          className="text-black font-bold text-center border-gray-600 border-2 "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-2">
        {estafadores?.map((clientes, x) => {
          const milliseconds =
            clientes?.fechaRegistro?.seconds * 1000 +
            clientes?.fechaRegistro?.nanoseconds / 1000000;
          const date = new Date(milliseconds);
          return (
            <div
              key={x + 1}
              className="relative group items-center justify-center overflow-hidden cursor-pointer w-56 h-64 border rounded-lg"
            >
              {/* Parte frontal de la tarjeta */}
              <div className="relative w-full h-full bg-red-900 text-white shadow-lg rounded-lg group-hover:rotate-y-180 transition-transform duration-500 ease-in-out">
                <div className="p-4 grid grid-cols-2 gap-2">
                  <p>Nick:</p>
                  <p>{clientes?.userName}</p>
                  <p>Página:</p>
                  <p>{clientes?.pagina}</p>
                  <p>Creador:</p>
                  <p>{clientes?.creador}</p>
                  <p>Registrado:</p>
                  {date && <p>{date?.toLocaleString()}</p>}
                </div>
              </div>

              {/* Parte trasera de la tarjeta */}
              <div className="absolute inset-0 bg-gradient-to-b from-inherit via-current to-black">
                <div className="absolute bg-red-950 inset-0 flex flex-col  text-center translate-y-[90%] group-hover:translate-y-0 transition-all">
                  <h2 className="top-0 mb-2">Comentarios</h2>
                  <Link to={`${clientes.link}`} target="_blank">
                    <section className=" overflow-auto bg-red-700 mb-8 text-white">
                      {clientes?.comentarios}
                    </section>
                  </Link>
                  <section className="absolute bottom-0 w-full flex justify-between px-4 m-0.5">
                    <button
                      onClick={() => handleEliminar(clientes.userName)}
                      className="uppercase border border-white px-0.5 hover:rounded-lg"
                    >
                      eliminar
                    </button>
                  </section>
                </div>
              </div>
            </div>
          );
        })}{estafadores?.length === 0 && (
          <div className="uppercase text-2xl text-center" >
            <p>no hay estafadores para mostrar</p>
          </div>
        )}
      </div>
    </div>
  );
};
