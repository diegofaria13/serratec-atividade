import axios from "axios";
import { useState } from "react";
import {
  Form,
  InputCadastro,
  ButtonCadastro,
} from "../../components/Cadastros";
import { API_URL_MAT } from "../../constants";
import Swal from "sweetalert2";

const CadastrarMaterias = () => {
  const [titulo, setTitulo] = useState();
  const [professor_nome, setProfessor_nome] = useState();

  const cadastrarMaterias = () => {
    axios
      .post(API_URL_MAT, {
        titulo,
        professor_nome,
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire(response?.data?.message, "Cadastro Realizado!", "success");
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
        Cadastrar{" "}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarMaterias;
