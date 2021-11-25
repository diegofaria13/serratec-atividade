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
import Lottie from 'react-lottie';
import animationData from '../../lotties/8617-open-book.json';
import withReactContent from "sweetalert2-react-content";

const ListagemMaterias = () => {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);

const mySwal = withReactContent(Swal);

  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_URL_MAT).then((response) => {
      setTimeout(() => {
        setMaterias(response.data);
      }, 1200)
    });
  };

  const deletarMaterias = (materia) => {
    axios
      .delete(API_URL_MAT, { data: materia })
      .then((response) => {
        //para o delete precisa usar o data? materia
        mySwal.fire(response?.data?.message,"Materia Removida do Cadastro!","success"
        );
        getMaterias();
      })
      .catch((error) => {
        mySwal.fire({icon: "error",title: "Oops...",text: error,
          //footer: '<a href="">Why do I have this issue?</a>'
        });
      });
  };

  const editarMateria = (materia) => {
    navigate(`/editar-materias/${materia.id}`); //aqui eu passo a rota e mostra o id que sera selecionado. reaproveitando a rora que ja existe de cadastro
  }

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
      { materias.length > 0 ? (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Materia</StyledTableCell>
              <StyledTableCell align="left">Professor</StyledTableCell>
              <StyledTableCell align="center">Ações</StyledTableCell>
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
      </TableContainer>): (
        <Lottie 
        options={defaultOptions}
          height={400}
          width={400}
        />
      )}
    </Box>
  );
};

export default ListagemMaterias;
