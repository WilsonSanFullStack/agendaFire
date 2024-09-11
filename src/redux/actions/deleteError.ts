import { Dispatch } from "redux";
import { actionTypes } from "../action";

export const deleteError = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: actionTypes.deleteError,
      payload: null,
    });
  };
};