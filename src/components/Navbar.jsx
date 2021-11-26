import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MaterialUISwitch } from "./styles";
import TemaContext from "../context/tema";
import { useContext  } from "react";

export default function ButtonAppBar(props) {

  const { setTemaSelecionado } = useContext(TemaContext);

  const alterarTema = (e) => {
    const novoTema = e.target.checked ? "claro" : "escuro";
    setTemaSelecionado(novoTema);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button
              sx={{ mr: 2, fontWeight: "bold" }}
              variant="contained"
              size="large"
            >
              Alunos
            </Button>
          </Link>

          {/* <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton> */}

          <Link to="/cadastrar-alunos">
            <Button
              sx={{ mr: 2, fontWeight: "bold" }}
              variant="contained"
              size="large"
            >
              Cadastro de Alunos
            </Button>
          </Link>

          <Link to="/listagem-materias">
            <Button
              sx={{ mr: 2, fontWeight: "bold" }}
              variant="contained"
              size="large"
            >
              Matérias
            </Button>
          </Link>

          <Link to="/cadastrar-materias">
            <Button
              sx={{ mr: 2, fontWeight: "bold" }}
              variant="contained"
              size="large"
            >
              Cadastro de Matérias
            </Button>
          </Link>

          <FormControlLabel
            sx={{ flex: 1, justifyContent: "flex-end" }}
            control={
              <MaterialUISwitch
                onClick={(e) => {
                  alterarTema(e);
                }}
                sx={{ mr: 1 }}
                defaultChecked
              />
            }
            label=""
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
