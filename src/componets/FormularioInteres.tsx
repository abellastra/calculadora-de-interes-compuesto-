import { useInputNumerico } from "../hooks/useInputNumerico";
type props = {
  dineroFormateado: string;
  setDineroFormateado: (value: string) => void;
  aportesMensualesFormateado: string;
  setAportesMensualesFormateado: (value: string) => void;
  dineroIngresado: string;
  aportesMensuales: string;
  tasaInteres: number;
  setTasaInteres: React.Dispatch<React.SetStateAction<number>>;
  tiempo: string;
  setTiempo: React.Dispatch<React.SetStateAction<string>>;
  frecuencia: string;
  setFrecuencia: React.Dispatch<React.SetStateAction<string>>;
  aplicarFormato: () => void;
  setDineroIngresado: (value: string) => void;
  setAportesMensuales: (value: string) => void;
};

function FormularioInteres({
  dineroFormateado,
  setDineroFormateado,
  aportesMensualesFormateado,
  setAportesMensualesFormateado,
  dineroIngresado,
  aportesMensuales,
  tasaInteres,
  setTasaInteres,
  tiempo,
  setTiempo,
  frecuencia,
  setFrecuencia,
  aplicarFormato,
  setDineroIngresado,
  setAportesMensuales,
}: props) {
  const { manejarCambios } = useInputNumerico({
    setDineroIngresado,
    setAportesMensuales,
  });
  return (
    <div className="cotainerInputs">
      <div className="container_item">
        <label htmlFor="montoDeIngreso">ingrese el monto de dinero</label>
        <input
          className="inputs"
          id="montoDeIngreso"
          type="text"
          value={dineroFormateado || dineroIngresado}
          onChange={manejarCambios}
          onBlur={aplicarFormato}
          onFocus={() => {
            setDineroFormateado("");
          }}
        />
      </div>
      <div className="container_item">
        <label htmlFor="aportesMensuales">aporte mensual </label>
        <input
          className="inputs"
          id="aportesMensuales"
          type="text"
          value={aportesMensualesFormateado || aportesMensuales}
          onChange={manejarCambios}
          onBlur={aplicarFormato}
          onFocus={() => {
            setAportesMensualesFormateado("");
          }}
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
            setTasaInteres(Number(e.target.value));
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
          <option value={1}>Anual</option>
          <option value={12}>Mensual</option>
          <option value={365}>Diario</option>
        </select>
      </div>
    </div>
  );
}
export default FormularioInteres;
