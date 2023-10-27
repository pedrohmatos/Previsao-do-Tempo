import "./Destaque.css";
import { MdPlace } from "react-icons/md";

function Destaque({ dados, semana }) {

    const {cidade, pais, ceu, temperatura } = dados;

    const temp = Math.round(Number(temperatura));

    const dataHoje = new Date().getDay();
    const diaDaSemana = semana[dataHoje];

    const diaHoje = new Date().toLocaleDateString();

    return (
        <section className="tela">
            <div className="emCima">
                <h2>{diaDaSemana}</h2>
                <p>{diaHoje}</p>
                {
                    cidade &&
                    <p>
                        <MdPlace className="licalIcone" /> {cidade + ", " + pais}
                    </p>
                }
            </div>

            {
                !isNaN(temp) &&
                <div className="emBaixo">
                    <h1>{temp + "°C"}</h1>
                    <p>{ceu}</p>
                </div>
            }
        </section>
    )
}

export default Destaque