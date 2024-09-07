import { actionTypes } from "../action";
import { initStateC, actionGetClientes } from "../types";

const initialState: initStateC = {
  getClientes: null,
};
export const clientesReducer = (
  state: initStateC = initialState,
  action: actionGetClientes
) => {
  switch (action.type) {
    case actionTypes.getClientes:
      return {
        ...state,
        getClientes: action.payload,
      };
    default:
      return state;
  }
};
