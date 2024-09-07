import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { Login } from "../types";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import { collection, getDocs } from "firebase/firestore/lite";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { auth } from "../../firebase/auth";

export const postUser = (login: Login) => {
  return async (dispatch: Dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, login.email, login.password);
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};

export const verificacionUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    try {
      if (user !== null) {
        await sendEmailVerification(user);
      } else {
        console.log("error");
      }
    } catch (error: unknown) {
      const errores = handleError(error);
      dispatch({
        type: actionTypes.error,
        payload: errores,
      });
    }
  };
};

export const deleteTokens = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.deleteToken,
      payload: null,
    });
  };
};

export const getUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      async function getCities() {
        const citiesCol = collection(DB, "usuarios");
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map((doc) => doc.data());
        return cityList;
      }
      const user = await getCities();
      console.log(user);
      dispatch({
        type: actionTypes.getUser,
        payload: user,
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
