import { actionTypes } from "../action";
import { initStateU,  actionGetUser } from "../types";

const initialState: initStateU = {
  getUser: null,
  postUser: null,
};
export const userReducer = (
  state: initStateU = initialState,
  action: actionGetUser
) => {
  switch (action.type) {
    case actionTypes.getUser:
      return {
        ...state,
        getUser: action.payload,
      };

      case actionTypes.postUser:
        return {
          ...state,
          postUser: action.payload
        }

      case actionTypes.deleteToken:
        return {
          ...state,
          postUser: action.payload
        }

    default:
      return state;
  }
};
