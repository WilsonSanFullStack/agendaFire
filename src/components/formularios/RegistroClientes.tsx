import { useState, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducer/index";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { getPagina } from "../../redux/actions/pagina";

const RegistroClientes = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [showForm, setShowForm] = useState(true);
  const getUserById = useSelector((state: RootState) => state.user.user);
  const paginas = useSelector((state: RootState) => state.pagina.pagina);
  const [registro, setRegistro] = useState({
    nombre: "",
    userName: "",
    nacionalidad: "",
    edad: "",
    pagina: "",
    creador: "",
    link: "",
  });
  console.log(registro.creador);
  useEffect(() => {
    dispatch(getPagina());
  }, []);
console.log(paginas)
  useEffect(() => {
    if (getUserById !== null && Array.isArray(getUserById) === false) {
      setRegistro({
        ...registro,
        creador: getUserById.userName,
      });
    }
  }, [getUserById]);

  const handlerNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      nombre: event.target.value,
    });
  };
  const handlerUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      userName: event.target.value,
    });
  };
  const handlerNacionalidad = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      nacionalidad: event.target.value,
    });
  };
  const handlerEdad = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      edad: event.target.value,
    });
  };
  const handlerPagina = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      pagina: event.target.value,
    });
  };
  const handlerLink = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      link: event.target.value,
    });
  };

  document.querySelectorAll(".no-spin").forEach((input) => {
    input.addEventListener("wheel", function (event) {
      event.preventDefault();
    });
  });

  const handlerSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setShowForm(false);
    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  return (
    <div className=" min-h-screen">
      {showForm && (
        <div className=" flex justify-center items-center min-h-screen">
          <form onSubmit={handlerSubmit}>
            <div>
              <section className="text-center text-4xl font-bold">
                Registrar Cliente
              </section>
              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="nombre del Cliente"
                  value={registro.nombre}
                  name="nombre"
                  onChange={handlerNombre}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="Nick del cliente"
                  value={registro.userName}
                  name="userName"
                  onChange={handlerUserName}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="escriba la nacionalidad"
                  value={registro.nacionalidad}
                  name="nacionalidad"
                  onChange={handlerNacionalidad}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="number"
                  placeholder="escriba la Edad"
                  value={registro.edad}
                  name="edad"
                  min="1"
                  onChange={handlerEdad}
                  className="text-black font-bold text-center border-gray-600 border-2 no-spin"
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                {paginas ? (
                  <select name="" id="" className="text-black font-bold">
                    <option value="" hidden>
                      Selecione una pagina
                    </option>
                    {paginas.map((pag, x) => {
                      return(<option key={x+1} className="text-black font-bold active:bg-gray-200">{pag.pagina}</option>)
                    })}
                  </select>
                ) : <p>Registre una pagina</p>}
              </section>
              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="link del Usuario"
                  value={registro.link}
                  name="link"
                  onChange={handlerLink}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center">
                <section className=" flex justify-center items-center m-1 font-bold uppercase">
                  <button className="border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500">
                    Registrar
                  </button>
                </section>
                <section className=" m-1 font-bold uppercase">
                  <Link to={"/home"}>
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
    </div>
  );
};

export default RegistroClientes;
