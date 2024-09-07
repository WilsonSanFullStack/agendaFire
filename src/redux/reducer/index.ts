// src/store/rootReducer.ts
import { combineReducers } from 'redux';
import { clientesReducer } from './reducerClientes';
import { userReducer } from './reducerUser';
import { errorReducer } from './reducerError';
import { actionTypes } from '../action';



const appReducer = combineReducers({
  clientes: clientesReducer,
  user: userReducer,
  errorAxios: errorReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === actionTypes.logout) {
    return appReducer({
      clientes: undefined,
      user: undefined,    // Resetea el estado del usuario
      errorAxios: undefined,  // Si también deseas reiniciar el error
    }, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
