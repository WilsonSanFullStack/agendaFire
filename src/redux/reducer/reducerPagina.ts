import { actionTypes } from "../action";
import { initStateP,  actionPagina } from "../types";

const initialState: initStateP = {
  pagina: null,
};
export const paginaReducer = (
  state: initStateP = initialState,
  action: actionPagina 
) => {
  switch (action.type) {
    case actionTypes.pagina:
      return {
        ...state,
        pagina: action.payload,
      };

    default:
      return state;
  }
};
