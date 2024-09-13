import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="min-h-screen">
      <section className="text-justify m-2">
        <h1 className="font-bold text-4xl text-center">Bienvenido a Agenda</h1>
        <p>
          Esta pagina esta hecha con el fin de facilitar y tener su propia base
          de datos de clientes de cualquiera de las paginas que usted use, solo
          y unicamente con el fin de que en cualquier lado con su Nick y
          password tenga acceso a las notas guardadas por usted mismo y asi
          tenga mas presente a cada uno de sus clientes.
        </p>
        <p>
          Por el momento no se tendra ningun cargo por uso de esta pagina a su
          vez esta sujeto a que se consuma el uso gratuito del hosting donde
          esta subida la pagina el cual se renueva mensualmente mas adelante y
          si veo cortes muy seguidos me comunicare con ustedes para una
          solucion. cualquier duda, inquietud, queja, reclamo o sugerencia la
          pueden hacer llegar a cualquiera de mis medios de comunicacion los
          cuales encontraran en el siguiente link
          <Link
            to={"https://wilsonsanchez.vercel.app/"}
            className="text-sky-500 font-serif font-bold uppercase active:text-stone-500  focus:text-green-500"
          >
            {" "}
            wilson sanchez
          </Link>
        </p>
      </section>
      <section className="flex grid-cols-2  justify-center">
        <section className="m-2 font-bold uppercase">
          <Link to={"/sesion"}>
            <button className="border-2 rounded-xl p-2 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500">
              Iniciar Sesion
            </button>
          </Link>
        </section>

        <section className="m-2 font-bold uppercase">
          <Link to={"/registro"}>
            <button className="border-2 rounded-xl p-2 active:bg-stone-500 hover:bg-blue-500 focus:bg-red-500">
              Registrarse
            </button>
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Inicio;
