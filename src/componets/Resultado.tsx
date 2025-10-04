import { useInteresCompuesto } from "../hooks/UseInteresCompuesto";

type props = {
  dineroIngresado: string;
  aportesMensuales: string;
  tasaInteres:string;
  tiempo: string;
  frecuencia: string;
  setMontoFinal: (valor:string)=>void;
  formatearMoneda: (valor:string)=>string;
};
function Resultado({
  dineroIngresado,
  tasaInteres,
  tiempo,
  frecuencia,
  aportesMensuales,
  setMontoFinal,
  formatearMoneda,
}: props) {
    
  const { montoFinal } = useInteresCompuesto({
    dineroIngresado: dineroIngresado,
    tasaInteres: tasaInteres,
    tiempo: tiempo,
    frecuencia: frecuencia,
    aportesMensuales: aportesMensuales,
  });

  if (
    dineroIngresado !== "" &&
    tasaInteres !== "" &&
    frecuencia !== "" &&
    tiempo !== ""
  ) {
    // setMontoFinal(`Resultado \n${formatearMoneda(montoFinal.toFixed(2))}`);
    setMontoFinal(`Resultado: ${formatearMoneda(montoFinal.toFixed())}`);
  } else {
    alert("complete todos los campos ");
    setMontoFinal("");
  }
}

export default Resultado;