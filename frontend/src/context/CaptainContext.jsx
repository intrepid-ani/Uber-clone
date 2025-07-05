import { createContext, useContext, useState } from "react";

export const captainDataContext = createContext();

export function CaptainDataProvider({ children }) {
  const [captainContext, setCaptainContext] = useState({
    fullname: {
      firstName: null,
      lastName: null,
    },
    email: null,
    vehicle: {
      name: null,
      numPlate: null,
      type: null,
      capacity: null,
    },
  });

  return (
    <captainDataContext.Provider value={{ captainContext, setCaptainContext }}>
      {children}
    </captainDataContext.Provider>
  );
}

export default function useCaptianContext() {
  return useContext(captainDataContext);
}
