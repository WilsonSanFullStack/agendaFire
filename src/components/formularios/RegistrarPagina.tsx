import { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/index";
import { deleteError } from "../../redux/actions/deleteError";
import { postPagina } from "../../redux/actions/pagina";

const RegistroPagina = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  const errorAxios = useSelector(
    (state: RootState) => state.errorAxios.errorAxios
  );

  const [init, setInit] = useState(false);
  const [pagina, setPagina] = useState("");
  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    dispatch(deleteError());
  }, [pagina]);
  const handlerPagina = (event: ChangeEvent<HTMLInputElement>) => {
    setPagina(event.target.value);
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowForm(false);
    setInit(true);
    dispatch(postPagina(pagina));
  };
  useEffect(() => {
    setTimeout(() => {
      if (errorAxios?.message) {
        setShowForm(true);
        setInit(false);
      } else if (init) {
        navigate('/home')
      }
    }, 1000);
  }, [init]);
  return (
    <div className="min-h-screen flex justify-center items-center">
      {showForm && (
        <div className="">
          <section>
            {errorAxios && (
              <div className="text-center bg-gray-900 m-2 p-2 rounded-lg">
                <section className="flex">
                  <p className="mx-2">mensaje</p>
                  <p className="text-red-500 font-bold">{errorAxios.message}</p>
                </section>
              </div>
            )}
          </section>
          <form onSubmit={handlerSubmit}>
            <div>
              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="Nombre de la Pagina"
                  value={pagina}
                  name="nombre"
                  onChange={handlerPagina}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center">
                <section className=" flex justify-center items-center m-1 font-bold uppercase">
                  <button
                    type="submit"
                    className="border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500"
                  >
                    Registrar
                  </button>
                </section>
                <section className=" m-1 font-bold uppercase">
                  <Link to={"/"}>
                    <button className="border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500">
                      Cancelar
                    </button>
                  </Link>
                </section>
              </section>
            </div>
          </form>
        </div>
      )}
      {init && (
        <div>
          <h1>Registrando Pagina</h1>
        </div>
      )}
    </div>
  );
};

export default RegistroPagina;
