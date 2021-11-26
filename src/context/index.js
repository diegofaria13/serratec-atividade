import { TemaProvider } from "./tema";
import { AlunoProvider } from "./aluno";

const GlobalContext = ({ children }) => {
    return(
        <TemaProvider>
            <AlunoProvider>
            {children}
            </AlunoProvider>
        </TemaProvider>
    )
};

export default GlobalContext;