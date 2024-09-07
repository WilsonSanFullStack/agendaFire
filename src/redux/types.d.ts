import { actionTypes } from "./action";
import { Action } from "redux";

export interface Clientes {
  nombre: string;
  id: number;
  edad: number;
  userName: string;
  nacionalidad: string;
  gustos: string[];
  fetiches: string[];
  comentatios: string[];
  creador: string;
  fechaRegistro: {
    _seconds: number;
    _nanoseconds: number;
  };
  pagina: string;
}
// types for action get clientes
export type getClientes = string;
export interface actionGetClientes extends Action {
  type: typeof actionTypes.getClientes;
  payload: Clientes[];
}
export interface initStateC {
  getClientes: Clientes[] | null;
}
// types for action get user
export interface User {
  admin: boolean;
  apellido: string;
  email: string;
  id?: number;
  nombre: string;
  password: string;
  registro?: {
    _seconds: number;
    _nanoseconds: number;
  };
  userName: string;
}
export type getUser = string;
export interface actionGetUser extends Action {
  type:
    | typeof actionTypes.getUser
    | actionTypes.postUser
    | actionTypes.deleteToken;
  payload: User[];
}
export interface initStateU {
  getUser: User[] | null;
  postUser: User | null;
}
export type PostUser = string;
// types for action inicio de sesion
export interface Login {
  email: string;
  password: string;
}


// types for action delete token

export type deleteToken = string;
export interface actionDeleteToken extends Action {
  type: typeof actionTypes.deleteToken;
  payload: null;
}

export type deleteToken = string;

// types for action errores
export interface ErrorAxios {
  message: string;
}

export type error = string;
export interface actionErrorAxios extends Action {
  type: typeof actionTypes.error | actionTypes.deleteToken;
  payload: ErrorAxios;
}
export interface initStateE {
  errorAxios: { message: string; status: number } | null;
}
export type ErrorAxios = string;



// types for storeState
export interface StoreState {
  clientes: initStateC;
  user: initStateU;
  errorAxios: initStateE;
}
