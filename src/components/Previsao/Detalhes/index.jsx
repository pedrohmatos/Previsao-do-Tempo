import "./Detalhes.css";

function Detalhes({ nome, dado = 0 }) {

    let unidadeDeMedida;

    if (nome === "VENTO") {
        unidadeDeMedida = "km/h";
    } else if (nome === "UMIDADE") {
        unidadeDeMedida = "%";
    } else {
        unidadeDeMedida = "mm";
    }

    return (
        <div className="detalhes">
            <p>{nome}</p>
            <span>
                {dado} {unidadeDeMedida}
            </span>
        </div>
    )
}

export default Detalhes