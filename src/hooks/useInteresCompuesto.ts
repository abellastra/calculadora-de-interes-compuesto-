type props = {
  dineroIngresado: string;
  tasaInteres: string;
  tiempo: string;
  frecuencia: string;
  aportesMensuales: string;
};
export const useInteresCompuesto = ({
  dineroIngresado,
  tasaInteres,
  tiempo,
  frecuencia,
  aportesMensuales,
}: props) => {
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
  let montoFinal = monto + (montoAporte || 0);
  return {montoFinal};
};
