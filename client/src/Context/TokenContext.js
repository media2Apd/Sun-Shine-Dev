

import { createContext, useState, useContext } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => {
    const stored = localStorage.getItem("tokens");
    return stored ? JSON.parse(stored) : [];
  });

  const generateToken = (userEmail) => {
    const token = Math.random().toString(36).substr(2);

    setTokens((prev) => {
      const index = prev.findIndex((t) => t.email === userEmail);
      let updated;

      if (index >= 0) {
        updated = [...prev];
        updated[index] = { email: userEmail, token };
      } else {
        updated = [...prev, { email: userEmail, token }];
      }

      localStorage.setItem("tokens", JSON.stringify(updated));
      return updated;
    });

    return token;
  };

  const getToken = (userEmail) => {
    const user = tokens.find((t) => t.email === userEmail);
    return user ? user.token : null;
  };

  // <-- define clearToken here, inside component
  const clearToken = (userEmail) => {
    setTokens((prev) => {
      const updated = prev.filter((t) => t.email !== userEmail);
      localStorage.setItem("tokens", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <TokenContext.Provider value={{ tokens, generateToken, getToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook
export const useToken = () => useContext(TokenContext);