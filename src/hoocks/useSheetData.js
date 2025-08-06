import React from "react";
import { useEffect, useState } from "react";
import { SHEET_ID, API_KEY,BASE_URL } from "../config";
import Swal from "sweetalert2";

//const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

const useSheetData = (range) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchsheetData = async () => {
      try {
        const url = `${BASE_URL}/${SHEET_ID}/values/${range}?key=${API_KEY}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result.values && result.values.length>0) {
          setData(result.values);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops....",
            text: "algo salio mal",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "error en la ed",
          text: `ocurrio un error:${error.message}`,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchsheetData();
  }, [range]);
  return { data, loading };
};

export default useSheetData;
