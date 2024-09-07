import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { Login } from "../types";
import { handleError } from "../../assets/errorHelper";
import { auth } from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const postInit = (login: Login) => {
  return async (dispatch: Dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};

export const deleteToken = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.deleteToken,
      payload: null,
    });
  };
};
