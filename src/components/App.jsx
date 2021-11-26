import { Container } from "@mui/material";
import AlunosListagem from "../pages/alunos/AlunosListagem";
import CadastrarAlunos from "../pages/alunos/CadastrarAlunos";
import CadastrarMaterias from "../pages/materias/CadastrarMaterias";
import ListagemMaterias from "../pages/materias/ListagemMaterias";
import { useRoutes } from "react-router-dom";
import { useContext } from "react";
import TemaContext from "../context/tema";
import tema from "../tema";

const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <AlunosListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/editar-alunos/:id", element: <CadastrarAlunos /> }, //aqui tem um :id para mostrar o id que sera recebido
    { path: "/listagem-materias", element: <ListagemMaterias /> },
    { path: "/cadastrar-materias", element: <CadastrarMaterias /> },
    { path: "/editar-materias/:id", element: <CadastrarMaterias /> },
  ]);

  return routes;
};

const App = () => {

  const { temaSelecionado } = useContext(TemaContext)

  return (
    <Container maxWidth="md" sx={tema[temaSelecionado]}>
      <Routes />
    </Container>
  );
};

export default App;
