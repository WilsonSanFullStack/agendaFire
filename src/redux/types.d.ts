import { actionTypes } from "./action";
import { Action } from "redux";

export interface Clientes {
  nombre: string;
  edad: number;
  userName: string;
  nacionalidad: string;
  comentarios: string;
  creador: string[];
  fechaRegistro: {
    seconds: number;
    nanoseconds: number;
  };
  pagina: string;
}
export interface Cliente {
  nombre: string;
  edad: number;
  userName: string;
  nacionalidad: string;
  comentarios: string;
  creador: string;
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
  id: number;
  nombre: string;
  registro?: {
    seconds: number;
    nanoseconds: number;
  };
  userName: string;
}
export type getUser = string;
export interface actionGetUser extends Action {
  type:
    | typeof actionTypes.getUser
    | actionTypes.postUser
    | actionTypes.deleteToken
    | actionTypes.update
    | actionTypes.getUserById;
  payload: User[];
}
export interface initStateU {
  getUser: User[] | null;
  postUser: User | null;
  update: string | null;
  user: User | null;
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
  type: typeof actionTypes.error | actionTypes.deleteError;
  payload: ErrorAxios;
}
export interface initStateE {
  errorAxios: { message: string; status: number } | null;
}
export type ErrorAxios = string;
// types for action errores
export type  Pagina = string

export interface actionPagina extends Action {
  type: typeof actionTypes.pagina
  payload: [{pagina: string}];
}
export interface initStateP {
  pagina: [{pagina: string}] | null;
}

// types for storeState
export interface StoreState {
  clientes: initStateC;
  user: initStateU;
  pagina: initStateP
  errorAxios: initStateE;
}
