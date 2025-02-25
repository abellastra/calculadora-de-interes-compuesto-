import { useState } from "react";
import "./App.css";

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

  function mejorarCambioDinero(e) {
    let entrada = e.target.value;
    let valorNumerico = entrada.replace(/[^0-9.]/g, "");
    if ((valorNumerico.match(/\./g) || []).length > 1) return; // Evitar más de un punto decimal

    if (e.target.id === "montoDeIngreso") {
      setDineroIngresado(valorNumerico); // Mantiene el valor sin formatear
      setDineroFormateado("");
    }

    let ingresoApotesMensuales = e.target.value;
    let valorNumericoAporte = ingresoApotesMensuales.replace(/[^0-9.]/g, "");
    if ((valorNumericoAporte.match(/\./g) || []).length > 1) return;
    if (e.target.id === "aportesMensuales") {
      setAportesMensuales(valorNumericoAporte);
      setAportesMensualesFormateado("");
    }
  }

  function calculaInteres() {
    //Monto Final = Capital Inicial(1+ Frecuencia de Capitalizacion /Tasa de Interes Anual)Frecuencia de Capitalizacion × Tiempo en Años

    let dineroInicial = parseFloat(dineroIngresado) || 0;
    let i = parseFloat(tasaInteres) / 100 || 0;
    let f = parseFloat(frecuencia) || 0;
    let t = parseFloat(tiempo) || 0;
    const monto = dineroInicial * Math.pow(1 + i / f, f * t);
    // let montoAportes = aporte * ((Math.pow(1 + tasaInteres/ 100 / <frecuencia>, frecuencia * tiempo) - 1) / (tasaInteres / 100 / frecuencia));
    let aporteInicialMensual = parseFloat(aportesMensuales) || 0;
    let aporteDiario = aporteInicialMensual / 30.44;
    let apoteAnual = aporteInicialMensual * 12;
    let montoAporte;
    if (f === 365) {
      montoAporte = aporteDiario * ((Math.pow(1 + i / f, f * t) - 1) / (i / f));
    } else if (f === 12) {
      montoAporte =
        aporteInicialMensual * ((Math.pow(1 + i / f, f * t) - 1) / (i / f));
    } else if (f === 1) {
      montoAporte = apoteAnual * ((Math.pow(1 + i / f, f * t) - 1) / (i / f));
    }
    const montoFinal = monto + montoAporte;
    if (
      dineroIngresado !== "" &&
      tasaInteres !== "" &&
      frecuencia !== "" &&
      tiempo !== ""
    ) {
      setMontoFinal(`Resultado \n${formatearMoneda(montoFinal.toFixed(2))}`);
    } else {
      setMontoFinal(alert("complete todos los campos "));
    }
  }
  return (
    <>
      <div className="contenedorPrincipal">
        <h1 className="titulo">Claculadora de interes compuesto </h1>
        <div className="cotainerInputs">
          <div className="container_item">
            <label htmlFor="montoDeIngreso">ingrese el monto de dinero</label>
            <input
              className="inputs"
              id="montoDeIngreso"
              type="text"
              value={dineroFormateado || dineroIngresado}
              onChange={mejorarCambioDinero}
              onBlur={aplicarFormato}
            />
          </div>
          <div className="container_item">
            <label htmlFor="aportesMensuales">aporte mensual </label>
            <input
              className="inputs"
              id="aportesMensuales"
              type="text"
              value={aportesMensualesFormateado || aportesMensuales}
              onChange={mejorarCambioDinero}
              onBlur={aplicarFormato}
            />
          </div>
          <div className="container_item">
            <label htmlFor="tasaDeInteres">Tasa de interes anual</label>
            <input
              className="inputs"
              type="number"
              id="tasaDeInteres"
              value={tasaInteres}
              onChange={(e) => {
                setTasaInteres(e.target.value);
              }}
            />
          </div>
          <div className="container_item">
            <label htmlFor="tiempo">tiempo de inversion en años</label>
            <input
              className="inputs"
              type="number"
              placeholder={`ingresa la cantidad de años`}
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
            />
          </div>{" "}
          <div className="container_item">
            <label htmlFor="frecuencia">
              ¿Cada cuánto tiempo se suman los intereses a tu dinero?
            </label>
            <select
              className="inputs"
              id="frecuencia"
              value={frecuencia}
              onChange={(e) => {
                setFrecuencia(e.target.value);
              }}
            >
              <option value="">seleccione una opcion:</option>
              <option value="1">Anual</option>
              <option value="12">Mensual</option>
              <option value="365">Diario</option>
            </select>
          </div>
          <div>
            <button className="button" onClick={calculaInteres}>
              Calcular
            </button>
            <h1 style={{ whiteSpace: "pre-line" }}>{montoFinal}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
