import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './index.css';
import AlunosListagem from './pages/alunos/AlunosListagem';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import CadastrarAlunos from './pages/alunos/CadastrarAlunos';
import CadastrarMaterias from './pages/materias/CadastrarMaterias';
import ListagemMaterias from './pages/materias/ListagemMaterias';

const Routes = () => {

    const routes = useRoutes([
      {path: "/", element: <AlunosListagem />},
      {path: "/cadastrar-alunos", element: <CadastrarAlunos />},
      {path: "/listagem-materias", element: <ListagemMaterias />},
      {path: "/cadastrar-materias", element: <CadastrarMaterias />}
    ])

    return routes;

}

ReactDOM.render(
  <BrowserRouter>
    <Navbar />

    <Container maxWidth="lg">
    <Routes />
    </Container>
  </BrowserRouter>,
  document.getElementById('root')
);
