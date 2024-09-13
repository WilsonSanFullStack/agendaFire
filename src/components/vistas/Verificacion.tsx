import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/reducer/index";
import { auth } from "../../firebase/auth";
import { verificacionUser } from "../../redux/actions/user";
import { onAuthStateChanged } from "firebase/auth";
import { deleteError } from "../../redux/actions/deleteError";

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
      setShow(true);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setEmailVerified(user.emailVerified);
      } else {
        setUser(null);
        setEmailVerified(false);
      }
    });

    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
  }, [user, emailVerified]);
  useEffect(() => {
    dispatch(deleteError());
  }, []);
  // Esta función verifica si el correo ha sido verificado, actualizando solo el estado correspondiente
  const checkEmailVerification = async () => {
    window.location.reload();
    navigate("/");
  };

  useEffect(() => {
    if (emailVerified) {
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  }, [emailVerified, navigate]);

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

            <section className="flex justify-center items-center m-1 font-bold uppercase">
              <button
                onClick={checkEmailVerification}
                className="border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500"
              >
                confirmar verificacion
              </button>
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
