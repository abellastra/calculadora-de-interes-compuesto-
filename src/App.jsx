import { use, useState } from "react";
import "./App.css";
import FormularioInteres from "./componets/FormularioInteres";
import { useInteresCompuesto } from "./hooks/UseInteresCompuesto";
import Resultado from "./componets/Resultado";
function App() {
  const [dineroIngresado, setDineroIngresado] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [montoFinal, setMontoFinal] = useState("");
  const [dineroFormateado, setDineroFormateado] = useState("");
  const [aportesMensuales, setAportesMensuales] = useState("");
  const [aportesMensualesFormateado, setAportesMensualesFormateado] =
    useState("");
      const propsFormulario = {
        dineroFormateado,
        dineroIngresado,
        tasaInteres,
        frecuencia,
        tiempo,
        aportesMensuales,
        aportesMensualesFormateado,
        aplicarFormato,

        aplicarFormato,
        setTasaInteres,
        setFrecuencia,
        setTiempo,
        setAportesMensuales,
        setDineroIngresado,
        setDineroFormateado,
        setAportesMensualesFormateado,
      };
      const propsResultado = {
        dineroIngresado,
        tasaInteres,
        frecuencia,
        tiempo,
        aportesMensuales,
        montoFinal,
        setMontoFinal,
        formatearMoneda,
      };
  function formatearMoneda(valor) {
    if (valor === "" || isNaN(valor)) return "";
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(valor);
  }

  function aplicarFormato() {
    if (dineroIngresado !== "" && !isNaN(parseFloat(dineroIngresado))) {
      setDineroFormateado(formatearMoneda(parseFloat(dineroIngresado)));
    }
    if (aportesMensuales !== "" && !isNaN(parseFloat(aportesMensuales))) {
      setAportesMensualesFormateado(
        formatearMoneda(parseFloat(aportesMensuales))
      );
    }
  }
  function calculaInteres() {
    Resultado({ ...propsResultado });
  }
  function restablecer() {
    setAportesMensualesFormateado("");
    setAportesMensuales("");
    setDineroFormateado("");
    setDineroIngresado("");
    setTasaInteres("");
    setTiempo("");
    setMontoFinal("");
    setFrecuencia("");
  }

  return (
    <>
      <div className="contenedorPrincipal">
        <h1 className="titulo">Claculadora de interes compuesto </h1>
        <FormularioInteres {...propsFormulario} />
        <div>
          <button className="button" onClick={calculaInteres}>
            Calcular
          </button>
          <button className="restablecer" onClick={restablecer}>
            Restablecer
          </button>
          <h1 className="resultadoFinal" style={{ whiteSpace: "pre-line" }}>
            {montoFinal}
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
