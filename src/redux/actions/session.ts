import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { handleError } from "../../assets/errorHelper";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";

export const postSession = () => {
  return async (dispatch: Dispatch) => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};
