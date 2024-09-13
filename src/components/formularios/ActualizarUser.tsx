import { useState, ChangeEvent, useEffect } from "react";
import { update } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/index";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/auth";
import { deleteError } from "../../redux/actions/deleteError";

const ActualizarUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  const response = useSelector((state: RootState) => state.user.postUser) ?? "";
  const [showForm, setShowForm] = useState(true);
  const [showRes, setShowRes] = useState(false);
  const [user, setUser] = useState(auth.currentUser?.uid);
  const errorAxios = useSelector(
    (state: RootState) => state.errorAxios.errorAxios
  );
  const updates = useSelector((state: RootState) => state.user.update);
  console.log(errorAxios);
  const [actualizar, setActualizar] = useState({
    nombre: "",
    apellido: "",
    userName: "",
    admin: false,
    id: "",
  });

  useEffect(() => {
    const act = async () => {
      await auth.updateCurrentUser(auth.currentUser);
    };
    act();
    if (typeof user === "string") {
      setActualizar({
        ...actualizar,
        id: user,
      });
    }
  }, [actualizar.id]);

  const handlerNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setActualizar({
      ...actualizar,
      nombre: event.target.value,
    });
  };
  const handlerApellido = (event: ChangeEvent<HTMLInputElement>) => {
    setActualizar({
      ...actualizar,
      apellido: event.target.value,
    });
  };
  const handlerUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setActualizar({
      ...actualizar,
      userName: event.target.value,
    });
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setShowForm(false);
    dispatch(update(actualizar));
    setTimeout(() => {
      setShowRes(true);
    }, 500);
  };
  useEffect(() => {
    if (errorAxios?.message) {
      setShowForm(true);
    } else if (updates === "usuario creado") {
      navigate("/home");
    }
  }, [dispatch,  updates]);
  useEffect(() => {
    dispatch(deleteError());
  }, [actualizar]);
  return (
    <div className=" min-h-screen">
      {showForm && (
        <div className=" flex justify-center items-center min-h-screen">
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
              <section className="text-center text-4xl font-bold">
                Actualizacion de usuario
              </section>
              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="escriba su nombre"
                  value={actualizar.nombre}
                  name="nombre"
                  onChange={handlerNombre}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="escriba su apellido"
                  value={actualizar.apellido}
                  name="apellido"
                  onChange={handlerApellido}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center m-1 ">
                <input
                  type="text"
                  placeholder="como te llamamos"
                  value={actualizar.userName}
                  name="userName"
                  onChange={handlerUserName}
                  className="text-black font-bold text-center border-gray-600 border-2 "
                />
              </section>

              <section className="flex justify-center items-center">
                <section className=" flex justify-center items-center m-1 font-bold uppercase">
                  <button className="border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500">
                    Actualizar
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
