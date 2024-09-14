import { useSelector } from "react-redux";
import { getClientes } from "../../redux/actions/clientes";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/reducer/index";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  const clientes = useSelector(
    (state: RootState) => state.clientes.getClientes
  );

  return (
    <div className="text-center items-center p-2 min-h-screen  pt-12">
      <h1 className="text-slate-50 text-3xl">hola soy el home</h1>
      <h1 className="text-red-500">hola soy el home</h1>

      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui id neque
          consequuntur cum odit suscipit ducimus deserunt nostrum unde, ab quas
          voluptates et cupiditate delectus. Omnis eos nulla iste commodi?
        </p>
      </div>
      <button
        onClick={() => {
          dispatch(getClientes());
        }}
        className="border-white border-2 p-1 "
      >
        get cliente
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
                  <section className=" overflow-auto">
                    {clientes?.comentarios}
                  </section>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
