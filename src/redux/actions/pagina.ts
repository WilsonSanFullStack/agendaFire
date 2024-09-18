import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { Pagina } from "../types";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import {
  setDoc,
  doc,
  collection,
  getDocs
} from "firebase/firestore/lite";



export const postPagina = (pagina: Pagina) => {
  return async (dispatch: Dispatch) => {
    try {
      const paginaDocRef = doc(DB, "paginas", pagina);
        await setDoc(paginaDocRef, {
          pagina: pagina
        });      
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      })
    }
  };
};

export const getPagina = () => {
  return async (dispatch: Dispatch) => {
    try {
      
        const paginaRef = collection(DB, 'paginas');
        const response = await getDocs(paginaRef);
        const paginas = response.docs.map(doc => doc.data());
      dispatch({
        type: actionTypes.pagina,
        payload: paginas,
      });
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      })
    }
  };
};

