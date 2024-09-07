import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import { collection, getDocs } from "firebase/firestore/lite";



export const getClientes = () => {
  return async (dispatch: Dispatch) => {
    try {
      async function getCitie() {
        const citiesCo = collection(DB, 'clientes');
        const citySnapsho = await getDocs(citiesCo);
        const cityLis = citySnapsho.docs.map(doc => doc.data());
        return cityLis;
      }
      const data = await getCitie()
      console.log(data)
      dispatch({
        type: actionTypes.getClientes,
        payload: data,
      });
    } catch (error: unknown) {
      console.log(error)
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      })
    }
  };
};
