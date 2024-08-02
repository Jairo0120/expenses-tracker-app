import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

function useAuth() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

const TokenProvider = (props) => {
  const [token, setToken] = useState(null);

  return <TokenContext.Provider {...props} value={{ token, setToken }} />;
};

export { TokenProvider, useAuth };
