import "./Dia.css";
import { WiDayRainWind, WiDaySunny } from "react-icons/wi"; // sol | sol com chuva
import { IoPartlySunnyOutline } from "react-icons/io5"; // sol com nuvens
import { AiOutlineCloud } from "react-icons/ai"; // nuvem 
import { BsCloudRainHeavy, BsSnow } from "react-icons/bs"; // nuvem com chuva | floco de neve
import { MdOutlineThunderstorm } from "react-icons/md"; // nuvem de trovão

function Dia({ ativo = false, dados, semana }) {

    const estilo = ativo ? { backgroundColor: "#f8f8f8", color: "#21212D" } : {};

    const { dia ,horario, temperatura, icone } = dados;

    const data = new Date(dia).getUTCDay();

    let iconeComponente;
    switch (icone) {
        case "01":
            iconeComponente = <WiDaySunny />;
            break;
        case "02":
            iconeComponente = <IoPartlySunnyOutline />;
            break;
        case "03":
        case "04":
            iconeComponente = <AiOutlineCloud />;
            break;
        case "09":
            iconeComponente = <BsCloudRainHeavy />
            break;
        case "10":
            iconeComponente = <WiDayRainWind />
            break;
        case "11":
            iconeComponente = <MdOutlineThunderstorm />
            break;
        case "13":
        case "50":
            iconeComponente = <BsSnow />
            break;
        default:
            iconeComponente = <WiDaySunny />;
            break;
    }

    return (
        <li className="dia" style={estilo}>
            <p>
                {semana[data]}
            </p>
            <span>
                {iconeComponente}
                <p>
                    {temperatura + "°C"} <br />
                    {horario}
                </p>
            </span>
        </li>
    )
}

export default Dia