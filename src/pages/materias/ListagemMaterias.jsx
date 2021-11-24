import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { StyledTableCell, StyledTableRow } from "../../components/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_MAT } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ListagemMaterias = () => {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_URL_MAT).then((response) => {
      setMaterias(response.data);
    });
  };

  const deletarMaterias = (materia) => {
    axios
      .delete(API_URL_MAT, { data: materia })
      .then((response) => {
        //para o delete precisa usar o data? materia
        Swal.fire(
          response?.data?.message,
          "Mat[eria Removida do Cadastro!",
          "success"
        );
        getMaterias();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          //footer: '<a href="">Why do I have this issue?</a>'
        });
      });
  };

  const editarMateria = (materia) => {
    navigate(`/editar-materias/${materia.id}`); //aqui o navigate esta fazendo ser redirecionado para o mesmo endere;o do cadastrar alunos para reaproveitar a pagina ja que vai ser usado a mesma coisa, porem esta enviando junto um id
  }

  return (
    <Box sx={{ marginTop: "25px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Materia</StyledTableCell>
              <StyledTableCell align="left">Professor</StyledTableCell>
              <StyledTableCell align="left">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((materia) => (
              <StyledTableRow>
                <StyledTableCell align="left">{materia.titulo}</StyledTableCell>
                <StyledTableCell align="left">
                  {materia.professor_nome}
                </StyledTableCell>
                <StyledTableCell align="center">
                <Button onClick={() => editarMateria(materia)} variant="text">
                    <EditIcon />{" "}
                  </Button>
                  <Button
                    onClick={() => deletarMaterias(materia)}
                    variant="text"
                  >
                    <DeleteIcon />{" "}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListagemMaterias;
