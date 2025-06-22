import React from "react";
import useSheetData from "../hoocks/useSheetData";
import { RANGO_vtos } from "../config";

const TestFetch = () => {
  const { data, loading } = useSheetData("vtos!A1:G");
  if (loading) return <p>cargando dtos</p>;

  return (
    <div>
      <h2>datos desde google sheets</h2>
      <table border="1">
        <thead>
          <tr>
              {data[0].map((celda, j) => (
            <th key={j}>{celda}</th>
          ))}
          </tr>
         
        </thead>
        <tbody>
          {data.slice(1).map((fila, i) => (
            <tr key={i}>
              {fila.map((celda, j) => (
                <td key={j}>{celda}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TestFetch;
