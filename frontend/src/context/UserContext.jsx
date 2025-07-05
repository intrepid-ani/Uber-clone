import { createContext, useContext, useState } from "react";

export const userDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userContext, setUserContext] = useState({
    fullname: { firstName: null, lastName: null },
    email: null,
  });

  return (
    <userDataContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </userDataContext.Provider>
  );
}

export default function useUserContext() {
  return useContext(userDataContext);
}
