import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MultaContext = createContext({ multas: [], setMultas: () => {} });

export default function MultaContextProvider({ children }) {
  const [multas, setMultas] = useState([]);
  useEffect(() => {
    async function fetcData() {
      try {
        const jsonValue = await AsyncStorage.getItem("MultasDb");
        const storageMultas = jsonValue ? JSON.parse(jsonValue) : [];

        setMultas(storageMultas);
      } catch (error) {
        console.log(error);
      }
    }

    fetcData();
  }, []);

  useEffect(() => {
    async function storeData() {
      try {
        const jsonValue = JSON.stringify(multas);
        await AsyncStorage.setItem("MultasDb", jsonValue);
      } catch (error) {
        console.log(error);
      }
    }

    storeData();
  }, [multas]);
  return (
    <MultaContext.Provider value={{ multas, setMultas }}>
      {children}
    </MultaContext.Provider>
  );
}
