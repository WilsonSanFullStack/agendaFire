import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import {
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { Cliente } from "../types";

export const getClientes = (userName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const clientesRef = collection(DB, "clientes");
      const q = query(
        clientesRef,
        where("creador", "array-contains", userName)
      );
      const data = await getDocs(q);
      const clientes = data.docs.map((doc) => doc.data());
      dispatch({
        type: actionTypes.getClientes,
        payload: clientes,
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
interface Props {
  userName: string;
  pagina: string;
}
export const getClientesPag = ({ userName, pagina }: Props) => {
  return async (dispatch: Dispatch) => {
    try {
      const clientesRef = collection(DB, "clientes");
      const q = query(
        clientesRef,
        where("creador", "array-contains", userName),
        where("pagina", "==", pagina)
      );
      const data = await getDocs(q);
      const clientes = data.docs.map((doc) => doc.data());
      dispatch({
        type: actionTypes.getClientes,
        payload: clientes,
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
interface Buscar {
  userName: string;
  nick: string;
}
export const getClientesBuscar = ({ userName, nick }: Buscar) => {
  return async (dispatch: Dispatch) => {
    try {
      const clientesRef = collection(DB, "clientes");
      const q = query(
        clientesRef,
        orderBy("userName"),
        startAt(nick),
        endAt(nick + "\uf8ff"),
        where("creador", "array-contains", userName),
        // limit(2)
      );
      const data = await getDocs(q);
      const clientes = data.docs.map((doc) => doc.data());
      dispatch({
        type: actionTypes.getClientes,
        payload: clientes,
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
          estafador: false,
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
