import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== "/404") {
      navigate("/404");
    }
  }, []);
  return (
    <div className="grid grid-cols-1 text-center items-center min-h-screen text-2xl">
      <section>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to={"/home"}>
        <button className="m-8 border-2 rounded-xl p-1 active:bg-stone-500 hover:bg-gray-500 focus:bg-white focus:text-black">Home</button>
      </Link>
      </section>
    </div>
  );
};
