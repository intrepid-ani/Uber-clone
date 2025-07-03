import { createContext, useContext, useState } from "react";

export const userDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userContext, setUserContext] = useState({
    fullname: { firstName: "", lastName: "" },
    email: "",
  });

  return (
    <userDataContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </userDataContext.Provider>
  );
}

export default function useUserData() {
  return useContext(userDataContext);
}
