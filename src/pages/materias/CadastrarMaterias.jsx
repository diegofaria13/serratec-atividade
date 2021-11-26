import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Form,
  InputCadastro,
  ButtonCadastro,
} from "../../components/Cadastros";
import { API_URL_MAT } from "../../constants";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import MateriaContext from "../../context/materia";
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";
import { Box } from "@mui/system";

const CadastrarMaterias = () => {
  const { materias, setMaterias } = useContext(MateriaContext);

  const { id } = useParams(); //vai pegar o id como um parametro
  const valorInicial = id ? " " : null;
  const [titulo, setTitulo] = useState(valorInicial);
  const [professor_nome, setProfessor_nome] = useState(valorInicial);

  useEffect((materia) => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    if (materias.length > 0) {
      materias.forEach((materia) => {
        //para cada aluno solicitado
        if (materia.id === id) {
          //confere se os ids sao iguais e coloca os dados do materia solicitado
          setTitulo(materia.titulo);
          setProfessor_nome(materia.professor_nome);
        }
      });
    } else {
      axios.get(API_URL_MAT).then((response) => {
        setMaterias(response.data);
        response.data.forEach((materia) => {
          //para cada aluno solicitado
          if (materia.id === parseInt(id)) {
            //confere se os ids sao iguais e coloca os dados do aluno solicitado
            setTitulo(materia.titulo);
            setProfessor_nome(materia.professor_nome);
          }
        });
      });
    }
  };

  const cadastrarMaterias = () => {
    if (id) {
      axios
        .put(API_URL_MAT, {
          id,
          titulo,
          professor_nome,
        })
        .then((response) => {
          if (response.status === 200) {
            axios.get(API_URL_MAT).then((response) => {
              setMaterias(response.data);
            });
            Swal.fire(response?.data?.message, "Edição Realizada!", "success");
            //MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            //footer: '<a href="">Why do I have this issue?</a>'
          });
        });
    } else {
      axios
        .post(API_URL_MAT, {
          titulo,
          professor_nome,
        })
        .then((response) => {
          if (response.status === 201) {
            axios.get(API_URL_MAT).then((response) => {
              setMaterias(response.data);
            });
            Swal.fire(
              response?.data?.message,
              "Cadastro Realizado!",
              "success"
            );
            //MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            //footer: '<a href="">Why do I have this issue?</a>'
          });
        });
    }
  };

  const limparCampos = () => {
    //seta todos os estados para vazio novamente
    setTitulo("");
    setProfessor_nome("");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box sx={{ marginTop: "25px" }}>
      {materias.length > 0 ? (
        <Form>
          <InputCadastro
            label="Materia"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <InputCadastro
            label="Professor"
            variant="outlined"
            value={professor_nome}
            onChange={(e) => setProfessor_nome(e.target.value)}
          />

          <ButtonCadastro variant="contained" onClick={cadastrarMaterias}>
            {id ? "Editar" : "Cadastrar"}
          </ButtonCadastro>
        </Form>
      ) : (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </Box>
  );
};

export default CadastrarMaterias;
