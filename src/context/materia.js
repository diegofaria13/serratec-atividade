import { createContext, useState } from "react";

const MateriaContext = createContext();

const MateriaProvider = ({ children }) => {
  const [ materias, setMaterias] = useState([]);
  return (
    <MateriaContext.Provider
      value={{
        materias,
        setMaterias,
      }}
    >
      {children}
    </MateriaContext.Provider>
  );
};

export { MateriaProvider };
export default MateriaContext;