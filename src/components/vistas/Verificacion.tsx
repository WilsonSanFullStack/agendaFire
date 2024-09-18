import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/reducer/index";
import { auth } from "../../firebase/auth";
import { verificacionUser } from "../../redux/actions/user";
import { postSession } from "../../redux/actions/session";

const Verificacion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<any>>();
  const errorAxios = useSelector(
    (state: RootState) => state.errorAxios.errorAxios
  );
  const [show, setShow] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [user, setUser] = useState<any>(null); // Asegúrate de que el tipo sea correcto
  const handlerSubmit = () => {

    if (user !== null) {
      dispatch(verificacionUser(user));
      dispatch(postSession());
      setTimeout(() =>{
        setShow(true);
        navigate('/')
      }, 500)
    }
  };
useEffect(() => {
  if (auth.currentUser) {
    if (auth.currentUser?.emailVerified) {
      setEmailVerified(auth.currentUser.emailVerified)
    }
    setUser(auth.currentUser)
  }

}, [user, auth])

  return (
    <div className="min-h-screen grid text-center items-center justify-center">
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

      <div className="">
        {show && (
          <div>
            <section>
              Correo enviado por favor espere una vez realice la verificacion
              del correo por favor oprima el siguiente boton e inicie sesion
            </section>
          </div>
        )}
      </div>

      {emailVerified && (
        <p className="text-green-500 font-bold">Correo verificado</p>
      )}

      {!show && (
        <section className="justify-center items-center m-1 font-bold uppercase">
          <p>para poder usar esta pagina por favor verifique su correo</p>
          <button
            onClick={handlerSubmit}
            className="border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500"
          >
            Enviar correo
          </button>
        </section>
      )}
    </div>
  );
};

export default Verificacion;
