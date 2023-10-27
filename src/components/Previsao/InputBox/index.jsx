import "./InputBox.css";

function InputBox({ enviar, valor, digitar }) {

    const handleEnviar = (e) => {
        if (e.keyCode === 13) {
            enviar(e);
        }
    };

    return (
        <div className="buscar">
            <input
                value={valor}
                onChange={digitar}
                onKeyUp={handleEnviar}
                placeholder="Tempo na cidade..."
                type="text"
                id="iBusca"
            />
            <p>PRESSIONE ENTER</p>
        </div>
    )
}

export default InputBox