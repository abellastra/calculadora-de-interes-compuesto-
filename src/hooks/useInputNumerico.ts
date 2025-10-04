import React, { useCallback } from "react";
type UseInputNumericoProps = {
  setDineroIngresado: (value: string) => void;
  setAportesMensuales: (value: string) => void;
};
export const useInputNumerico = ({ setDineroIngresado, setAportesMensuales }:UseInputNumericoProps) => {
  const manejarCambios = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let entrada = e.target.value;

      let valorNumerico = entrada.replace(/[^0-9.]/g, "");
      if ((valorNumerico.match(/\./g) || []).length > 1) return; // Evitar más de un punto decimal

      if (e.target.id === "montoDeIngreso") {
        setDineroIngresado(valorNumerico); // Mantiene el valor sin formatear
      }

      let ingresoApotesMensuales = e.target.value;
      let valorNumericoAporte = ingresoApotesMensuales.replace(/[^0-9.]/g, "");
      if ((valorNumericoAporte.match(/\./g) || []).length > 1) return;
      if (e.target.id === "aportesMensuales") {
        setAportesMensuales(valorNumericoAporte);
      }
    },[setDineroIngresado, setAportesMensuales]
  );
  return {manejarCambios}
};
