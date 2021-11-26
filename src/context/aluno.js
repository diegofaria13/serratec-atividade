import { createContext, useState } from "react";

const AlunoContext = createContext();

const AlunoProvider = ({ children }) => {
  const [ alunos, setAlunos] = useState([]);
  return (
    <AlunoContext.Provider
      value={{
        alunos,
        setAlunos,
      }}
    >
      {children}
    </AlunoContext.Provider>
  );
};

export { AlunoProvider };
export default AlunoContext;
