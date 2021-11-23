import axios from "axios";
import { useEffect, useState } from "react";
import {
  Form,
  InputCadastro,
  ButtonCadastro,
} from "../../components/Cadastros";
import { API_URL } from "../../constants";

const CadastrarAlunos = () => {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [cidade, setCidade] = useState();

  const cadastrarAlunos = () => {
      axios.post(API_URL, {
          nome, 
          idade, 
          cidade
        }).then(response => {
            if(response.status === 201) {
                alert("Aluno cadastrado com sucesso!");
            }
      });
    }

  return (
    <Form>
      <InputCadastro
        label="Nome"
        variant="outlined"
        onChange={(e) => setNome(e.target.value)}
      />
      <InputCadastro
        label="Idade"
        variant="outlined"
        onChange={(e) => setIdade(e.target.value)}
      />
      <InputCadastro
        label="Cidade"
        variant="outlined"
        onChange={(e) => setCidade(e.target.value)}
      />

      <ButtonCadastro variant="contained" onClick={cadastrarAlunos} >Cadastrar </ButtonCadastro>
    </Form>
  );
};

export default CadastrarAlunos;
