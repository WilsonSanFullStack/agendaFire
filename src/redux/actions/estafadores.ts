import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
} from "firebase/firestore/lite";
import { Estafador } from "../types";

export const getEstafadores = () => {
  return async (dispatch: Dispatch) => {
    try {
      const estafadorRef = collection(DB, "estafadores");
      const data = await getDocs(estafadorRef);
      const estafadores = data.docs.map((doc) => doc.data());
      dispatch({
        type: actionTypes.getEstafador,
        payload: estafadores,
      });
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};

export const getEstafadorBuscar = (nick: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const buscarDocRef = collection(DB, "estafadores");
      const q = query(
        buscarDocRef,
        orderBy("userName"),
        startAt(nick),
        endAt(nick + "\uf8ff")
      );
      const data = await getDocs(q);
      const estafador = data.docs.map((doc) => doc.data());
      dispatch({
        type: actionTypes.getEstafador,
        payload: estafador,
      });
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};
export const postEstafadores = (registro: Estafador) => {
  return async (dispatch: Dispatch) => {
    try {
      const estafadorDocRef = doc(DB, "estafadores", registro.userName);
      await setDoc(estafadorDocRef, {
        userName: registro.userName,
        creador: registro.creador,
        comentarios: registro.comentarios,
        pagina: registro.pagina,
        link: registro.link,
        fechaRegistro: serverTimestamp()
      });
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};

export const deleteEstafador = (eliminar:string) => {
  return async (dispatch: Dispatch) => {
    try {
      const deleteDocRef = doc(DB, 'estafadores', eliminar)
      await deleteDoc(deleteDocRef)
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};

