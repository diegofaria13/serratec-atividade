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
import { API_URL } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Lottie from 'react-lottie';
import animationData from '../../lotties/78259-loading.json';

const AlunosListagem = () => {
  const navigate = useNavigate(); //para redirecionar para uma pagina ja existente
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    getAlunos(); //sempre que entrarna aplica;'ao vai executar o getAlunos
  }, []);

  const getAlunos = () => {
    axios.get(API_URL).then((response) => {
      //O getAlunos carrega todos os alunos no inicio de cada execu;'ao
      setAlunos(response.data);
    });
  };

  const deletarAluno = (aluno) => {
    axios
      .delete(API_URL, { data: aluno })
      .then((response) => {
        //para o delete precisa usar o data? aluno
        Swal.fire(
          response?.data?.message,
          "Cadastro do Aluno Removido!",
          "success"
        );
        // getAlunos() usando aqui somente o get alunos no lugar de todo codigo abadixo ele tbm atualiza a pagina assim que deletado, porem menos performatico
        const alunoIndex = alunos.findIndex(
          //para remover o aluno da pagina assim que clicar em delete
          (elemento) => elemento.id === aluno.id
        );
        const newAlunos = [...alunos];
        newAlunos.splice(alunoIndex, 1);
        setAlunos(newAlunos);
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

  const editarAluno = (aluno) => {
    navigate(`/editar-alunos/${aluno.id}`); //aqui o navigate esta fazendo ser redirecionado para o mesmo endere;o do cadastrar alunos para reaproveitar a pagina ja que vai ser usado a mesma coisa, porem esta enviando junto um id
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Box sx={{ marginTop: "25px" }}>
      { alunos.length > 0 ? (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nome</StyledTableCell>
              <StyledTableCell align="left">Idade</StyledTableCell>
              <StyledTableCell align="left">Cidade</StyledTableCell>
              <StyledTableCell align="left">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => (
              <StyledTableRow>
                <StyledTableCell align="left">{aluno.nome}</StyledTableCell>
                <StyledTableCell align="left">{aluno.idade}</StyledTableCell>
                <StyledTableCell align="left">{aluno.cidade}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => editarAluno(aluno)} variant="text">
                    <EditIcon />{" "}
                  </Button>
                  <Button onClick={() => deletarAluno(aluno)} variant="text">
                    <DeleteIcon />{" "}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <Lottie 
        options={defaultOptions}
          height={400}
          width={400}
        />
      )
      }
      
    </Box>
  );
};

export default AlunosListagem;
