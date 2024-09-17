import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

export const getEstafadores = () => {
  return async (dispatch: Dispatch) => {
    try {
      const estafadorRef = collection(DB, "clientes");
      const q = query(
        estafadorRef,
        where("estafador", '==', true)
      );
      const data = await getDocs(q);
      const estafadores = data.docs.map((doc) => doc.data());
      console.log(estafadores)
      dispatch({
        type: actionTypes.getEstafador,
        payload: estafadores,
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
