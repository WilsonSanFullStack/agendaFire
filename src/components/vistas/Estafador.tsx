import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../redux/reducer/index";
import { getEstafadores } from "../../redux/actions/estafadores";

export const Estafador = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const estafadores = useSelector(
    (state: RootState) => state.estafadores.getEstafador
  );
  console.log(estafadores)
  useEffect(() => {
    dispatch(getEstafadores());
  }, []);
  return (
    <div className="text-center items-center p-2 min-h-screen  pt-12">
      {estafadores?.length &&
        estafadores.map((estafador, x) => {
          return <div key={x+1}>{estafador.userName}</div>;
        })}
    </div>
  );
};
