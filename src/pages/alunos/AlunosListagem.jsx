import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import {StyledTableCell, StyledTableRow} from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";

const AlunosListagem = () => {
    const [alunos, setAlunos] = useState([]);

    useEffect(()=> {
      axios.get(API_URL)
      .then((response) => {
        setAlunos(response.data);
      })
    }, [])

  return (
    <Box sx={{marginTop: '25px'}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nome</StyledTableCell>
              <StyledTableCell align="left">Idade</StyledTableCell>
              <StyledTableCell align="left">Cidade</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => (
              <StyledTableRow>
                <StyledTableCell align="left">{aluno.nome}</StyledTableCell>
                <StyledTableCell align="left">{aluno.idade}</StyledTableCell>
                <StyledTableCell align="left">{aluno.cidade}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
};

export default AlunosListagem;
