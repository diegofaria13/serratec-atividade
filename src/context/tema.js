import { createContext, useState } from "react";

const TemaContext = createContext();

const TemaProvider = ({ children }) => {
  const [temaSelecionado, setTemaSelecionado] = useState("claro");
  return (
    <TemaContext.Provider
      value={{
        temaSelecionado,
        setTemaSelecionado,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
};

export { TemaProvider };
export default TemaContext;
