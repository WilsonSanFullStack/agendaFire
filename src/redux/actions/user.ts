import { Dispatch } from "redux";
import { actionTypes } from "../action";
import { Login } from "../types";
import { handleError } from "../../assets/errorHelper";
import { DB } from "../../firebase/db";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  serverTimestamp
} from "firebase/firestore/lite";
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
interface Actualizar {
  nombre: string;
  apellido: string;
  userName: string;
  admin: boolean;
  id: string;
}

export const update = (actualizar: Actualizar) => {
  return async (dispatch: Dispatch) => {
    try {
      const userDocRef = doc(DB, "usuarios", actualizar.id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        dispatch({
          type: actionTypes.error,
          payload: { message: "El usuario ya existe en la base de datos." },
        });
      } else {
        const actualizarRef = doc(DB, "usuarios", actualizar.id);
        await setDoc(actualizarRef, {
          nombre: actualizar.nombre,
          apellido: actualizar.apellido,
          userName: actualizar.userName,
          admin: actualizar.admin,
          id: actualizar.id,
          registro: serverTimestamp()
        });
        dispatch({
          type: actionTypes.update,
          payload: "usuario creado",
        });
      }
    } catch (error) {
      console.log(error);
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

export const getUserByUID = (user: string) => {
  return async (dispatch: Dispatch) => {
    try {
      // Crear referencia al documento específico usando el UID
      const userDocRef = doc(DB, "usuarios", user);
      
      // Obtener el documento
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data(); // Obtener los datos del documento
        dispatch({
          type: actionTypes.getUserById,
          payload: userData,
        });
      } else {
        dispatch({
          type: actionTypes.error,
          payload: {message: "No se encontró el usuario con el UID proporcionado."},
        });
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