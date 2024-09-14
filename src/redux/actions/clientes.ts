import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { Cliente } from "../types";

export const getClientes = () => {
  return async (dispatch: Dispatch) => {
    try {
      async function getCitie() {
        const citiesCo = collection(DB, "clientes");
        const citySnapsho = await getDocs(citiesCo);
        const cityLis = citySnapsho.docs.map((doc) => doc.data());
        return cityLis;
      }
      const data = await getCitie();
      console.log(data);
      dispatch({
        type: actionTypes.getClientes,
        payload: data,
      });
    } catch (error: unknown) {
      console.log(error);
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};
export const postCliente = (registro: Cliente) => {
  return async (dispatch: Dispatch) => {
    try {
      const clienteDocRef = doc(DB, "clientes", registro.userName);
      const clienteDoc = await getDoc(clienteDocRef);
      if (clienteDoc.exists()) {
        const existe = clienteDoc.data();
        if (existe?.creador && existe.creador.includes(registro.creador)) {
          dispatch({
            type: actionTypes.getClientes,
            payload: {
              message:
                "El Cliente ya existe y está registrado por este usuario.",
            },
          });
        } else {
          await updateDoc(clienteDocRef, {
            creador: arrayUnion(registro.creador),
          });
        }
      } else {
        await setDoc(clienteDocRef, {
          nombre: registro.nombre,
          edad: registro.edad,
          userName: registro.userName,
          nacionalidad: registro.nacionalidad,
          comentarios: registro.comentarios,
          pagina: registro.pagina,
          creador: [registro.creador],
          fechaRegistro: serverTimestamp(),
        });
      }
    } catch (error: unknown) {
      console.log(error);
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};
