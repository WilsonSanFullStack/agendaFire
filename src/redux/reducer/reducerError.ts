import { actionTypes } from "../action";
import { initStateE,  actionErrorAxios } from "../types";

const initialState: initStateE = {
  errorAxios: null,
};
export const errorReducer = (
  state: initStateE = initialState,
  action: actionErrorAxios 
) => {
  switch (action.type) {
    case actionTypes.error:
      return {
        ...state,
        errorAxios: action.payload,
      };
      case actionTypes.deleteToken:
      return {
        ...state,
        errorAxios: action.payload,
      };

    default:
      return state;
  }
};
