import { createContext, useContext, useState } from "react";

export const captainDataContext = createContext();

export function CaptainDataProvider({ children }) {
  const [captainContext, setCaptainContext] = useState({
    fullname: {
      firstName: "",
      lastName: "",
    },
    email: "",
    vehicle: {
      name: "",
      numPlate: "",
      type: "",
      capacity: "",
    },
  });

  return (
    <captainDataContext.Provider value={{ captainContext, setCaptainContext }}>
      {children}
    </captainDataContext.Provider>
  );
}

export default function useCaptainData() {
  return useContext(captainDataContext);
}
