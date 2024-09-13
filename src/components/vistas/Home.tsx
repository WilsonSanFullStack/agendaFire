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
      <div>
        {clientes?.map((clientes, x) => {
          const milliseconds =
            (clientes?.fechaRegistro?.seconds ?? 0) * 1000 +
            (clientes?.fechaRegistro?.nanoseconds ?? 0) / 1000000;
          const date = new Date(milliseconds);
          return (
            <div key={x + 1}>
              <p className=" text-white">{clientes?.id}</p>

              <p className="text-white">{clientes?.nombre}</p>
              <p className="text-white">{clientes?.userName}</p>
              <p className=" text-white">{clientes?.edad}</p>
              <p className=" text-white">{clientes?.nacionalidad}</p>
              <p className=" text-white">{clientes?.pagina}</p>
              <section className=" text-white">
                {clientes?.comentatios?.map((a, x) => {
                  return (
                    <p className="text-blue-500" key={x + 1}>
                      {a}
                    </p>
                  );
                })}
              </section>
              <section className=" text-white">
                {clientes?.fetiches?.map((a, x) => {
                  return (
                    <p className="text-green-500" key={x + 1}>
                      {a}
                    </p>
                  );
                })}
              </section>
              <section className=" text-white">
                {clientes?.gustos?.map((a, x) => {
                  return (
                    <p className="text-yellow-500" key={x + 1}>
                      {a}
                    </p>
                  );
                })}
              </section>
              <p className=" text-white">{clientes?.creador}</p>
              {date && (
                <p className=" text-white">{date?.toLocaleString()} UTC-5</p>
              )}
            </div>
          );
        })}
        <div />

      </div>
    </div>
  );
};

export default Home;
