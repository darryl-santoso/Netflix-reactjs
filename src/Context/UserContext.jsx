import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [User, setUser] = useState(null);
  const [userStarted, setUserStarted] = useState({
    email:"",
    errorEmail:""
  })

  return (
    <AuthContext.Provider value={{ User, setUser, userStarted, setUserStarted }}>
      {children}
    </AuthContext.Provider>
  );
}
