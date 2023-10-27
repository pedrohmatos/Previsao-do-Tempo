import "./Previsao.css";
import Dia from "./Dias";
import InputBox from "./InputBox";
import Detalhes from "./Detalhes";
import Destaque from "./Destaque";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Previsao() {

    const apiWeatherKey = "0d456b92b1bbfaf3509d2c655e701a79";
    const [hoje, setHoje] = useState({});
    const [previsao, SetPrevisao] = useState([]);
    const [cidade, setCidade] = useState("");

    const handleDigitar = (e) => {
        setCidade(e.target.value);
    };

    const handleKeyUp = (e) => {
        buscarDadosAPI(cidade);
        setCidade("")
    };

    async function buscarDadosAPI(nomeDaCidade) {
        try {
            const localizacao = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${nomeDaCidade}&appid=${apiWeatherKey}`)
                .then(resp => resp.json())
                .then(resp => resp[0])
                .then((resp) => [resp.lat, resp.lon])

            const dataHoje = new Date().toLocaleDateString();
            const atualClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${localizacao[0]}&lon=${localizacao[1]}&appid=${apiWeatherKey}&units=metric&lang=pt_br`)
                .then(resp => resp.json())
                .then((resp) => {
                    if ("rain" in resp) {
                        resp = {
                            dia: dataHoje,
                            cidade: resp.name,
                            pais: resp.sys.country,
                            ceu: resp.weather[0].description,
                            icone: resp.weather[0].icon,
                            temperatura: resp.main.temp,
                            vento: resp.wind.speed,
                            umidade: resp.main.humidity,
                            chuva: resp.rain["1h"]
                        }
                    } else {
                        resp = {
                            dia: dataHoje,
                            cidade: resp.name,
                            pais: resp.sys.country,
                            ceu: resp.weather[0].description,
                            icone: resp.weather[0].icon,
                            temperatura: resp.main.temp,
                            vento: resp.wind.speed,
                            umidade: resp.main.humidity,
                        }
                    }
                    return resp;
                })
            setHoje(atualClima);

            const previsaoClima = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${localizacao[0]}&lon=${localizacao[1]}&appid=${apiWeatherKey}&units=metric&lang=pt_br`)
                .then(resp => resp.json())
                .then(resp => resp.list.filter((obj) => {
                    return obj.dt_txt.split("-").reverse()[0].slice(0, 2) > new Date().getDate()
                }))
                .then((resp) => {
                    const novo = resp.map((obj) => {
                        return {
                            dia: obj.dt_txt.split(" ")[0],
                            horario: obj.dt_txt.split("-").reverse()[0].substring(3, 8),
                            temperatura: obj.main.temp,
                            icone: obj.weather[0].icon.slice(0, 2)
                        }
                    });
                    return novo;
                })
            SetPrevisao(previsaoClima);
        } catch (error) {
            return window.alert("Ocorreu um erro: \n Cidade não encontrada. Verifique o nome da cidade e tente novamente.");
        }
    };

    const semana = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado"
    ];

    return (
        <main className="previsaoClima">
            <Destaque dados={hoje} semana={semana} />

            <section className="informacoes">
                <div className="ar">
                    <Detalhes nome={"CHUVA"} dado={hoje.chuva || 0} />
                    <Detalhes nome={"UMIDADE"} dado={hoje.umidade} />
                    <Detalhes nome={"VENTO"} dado={hoje.vento} />
                </div>

                <ul className="semana">
                    {
                        Object.keys(hoje).length !== 0 &&
                        <Dia
                            ativo={true}
                            dados={hoje}
                            semana={semana}
                        />
                    }
                    {
                        previsao.map((obj) => {
                            return (
                                <Dia
                                    dados={obj}
                                    key={uuidv4()}
                                    semana={semana}
                                />
                            )
                        })
                    }
                </ul>


                <InputBox enviar={handleKeyUp} valor={cidade} digitar={handleDigitar} />
            </section>

        </main>
    )
}

export default Previsao