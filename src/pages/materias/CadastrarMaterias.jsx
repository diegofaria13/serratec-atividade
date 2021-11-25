import axios from "axios";
import { useEffect, useState } from "react";
import {
  Form,
  InputCadastro,
  ButtonCadastro,
} from "../../components/Cadastros";
import { API_URL_MAT } from "../../constants";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const CadastrarMaterias = () => {
  const { id } = useParams(); //vai pegar o id como um parametro
  const valorInicial = id ? " " : null;
  const [titulo, setTitulo] = useState(valorInicial);
  const [professor_nome, setProfessor_nome] = useState(valorInicial);

  useEffect((materia) => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_URL_MAT).then((response) => {
      response.data.forEach((materia) => {
        if (materia.id === id) {
          setTitulo(materia.titulo);
          setProfessor_nome(materia.professor_nome);
        }
      });
    });
  };

  const cadastrarMaterias = () => {
    if (id) {
      axios
        .put(API_URL_MAT, {
          id,
          titulo,
          professor_nome
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire(
              response?.data?.message,
              "Edição Realizada!",
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
    } else {
      axios
        .post(API_URL_MAT, {
          titulo,
          professor_nome
        })
        .then((response) => {
          if (response.status === 201) {
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

  return (
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
        {id ? 'Editar' : 'Cadastrar'}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarMaterias;
