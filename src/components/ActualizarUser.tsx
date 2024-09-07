import { useState, ChangeEvent, useEffect } from "react";
import { deleteTokens, postUser } from "../redux/actions/user";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducer/index";
import { Link, useNavigate } from "react-router-dom";

const ActualizarUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  const response = useSelector((state: RootState) => state.user.postUser) ?? "";
  const [showForm, setShowForm] = useState(true);
  const [showRes, setShowRes] = useState(false);
  const [registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    userName: "",
    email: "",
    admin: false,
    password: "",
    confirmarPassword: "",
  });

  const handlerNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      nombre: event.target.value,
    });
  };
  const handlerApellido = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      apellido: event.target.value,
    });
  };
  const handlerUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      userName: event.target.value,
    });
  };
  const handlerEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      email: event.target.value,
    });
  };
  const handlerPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      password: event.target.value,
    });
  };
  const handlerConfirmarPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setRegistro({
      ...registro,
      confirmarPassword: event.target.value,
    });
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setShowForm(false);
    dispatch(postUser(registro));
    setTimeout(() => {
      setShowRes(true);
    }, 500);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (response === "usuario creado" ) {
  //       dispatch(deleteTokens())
  //       return navigate("/");
  //     } else {
  //       setShowForm(true);
  //     }
  //   }, 2500);
  // }, [response]);

  return (
    <div className=" min-h-screen">
      {showForm && (
        <div className=" flex justify-center items-center min-h-screen">
          <form onSubmit={handlerSubmit}>
            <div>
              <section className="text-center text-4xl font-bold">
                Registro
              </section>
              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="escriba su nombre"
                  value={registro.nombre}
                  name="nombre"
                  onChange={handlerNombre}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="escriba su apellido"
                  value={registro.apellido}
                  name="apellido"
                  onChange={handlerApellido}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="como te llamamos"
                  value={registro.userName}
                  name="userName"
                  onChange={handlerUserName}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="escriba un correo"
                  value={registro.email}
                  name="email"
                  onChange={handlerEmail}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="password"
                  placeholder="digite una contraseña"
                  value={registro.password}
                  name="password"
                  onChange={handlerPassword}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="password"
                  placeholder="Repita la contraseña"
                  value={registro.confirmarPassword}
                  name="confirmarPassword"
                  onChange={handlerConfirmarPassword}
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
      {showRes && (
        <div className="text-green-500 font-bold text-center flex justify-center items-center min-h-screen text-4xl uppercase animate-bounce">
          {typeof response === "string" ? response : ""}
        </div>
      )}
    </div>
  );
};

export default ActualizarUser;
