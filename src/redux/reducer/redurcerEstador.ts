import { actionTypes } from "../action";
import { initStateS, actionGetEstafadores } from "../types";

const initialState: initStateS = {
  getEstafador: null,
};
export const estafadorReducer = (
  state: initStateS = initialState,
  action: actionGetEstafadores
) => {
  switch (action.type) {
    case actionTypes.getEstafador:
      return {
        ...state,
        getEstafador: action.payload,
      };
    default:
      return state;
  }
};
