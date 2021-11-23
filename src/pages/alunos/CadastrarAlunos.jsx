import axios from "axios";
import { useState } from "react";
import { Form, InputCadastro, ButtonCadastro} from "../../components/Cadastros";
import { API_URL } from "../../constants";
import Swal from "sweetalert2";

const CadastrarAlunos = () => {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [cidade, setCidade] = useState();

  const cadastrarAlunos = () => {
    axios
      .post(API_URL, {
        nome,
        idade,
        cidade,
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire(
            response?.data?.message,
            'Cadastro Realizado!',
            'success'
          );
          //MySwal.fire(<p>{response?.data?.message}</p>);
          limparCampos();
        }
      });
  };

  const limparCampos = () => { //seta todos os estados para vazio novamente
    setNome("");
    setIdade("");
    setCidade("");
  };

  return (
    <Form>
      <InputCadastro
        label="Nome"
        variant="outlined"
        value={nome} //pra depois que cadastrar ele colocar valor vazio que vem da funcao liparcampos
        onChange={(e) => setNome(e.target.value)}
      />
      <InputCadastro
        label="Idade"
        variant="outlined"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <InputCadastro
        label="Cidade"
        variant="outlined"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <ButtonCadastro variant="contained" onClick={cadastrarAlunos}>
        Cadastrar{" "}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarAlunos;
