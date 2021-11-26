import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Form,
  InputCadastro,
  ButtonCadastro,
} from "../../components/Cadastros";
import { API_URL } from "../../constants";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import AlunoContext from "../../context/aluno";
import { Box } from "@mui/system";
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";

const CadastrarAlunos = () => {
  const { alunos, setAlunos } = useContext(AlunoContext);

  const { id } = useParams(); //como o editar alunos esta enviando um id junto criar essa constante para pegar esse id
  const valorInicial = id ? " " : null; //valor inciial [e para ver se tem algum valor.. se tiver coloca vazio para o placeholder nome, idade e cidade subir e nao fica por cima dos dados que vierem
  const [nome, setNome] = useState(valorInicial);
  const [idade, setIdade] = useState(valorInicial);
  const [cidade, setCidade] = useState(valorInicial);

  useEffect((aluno) => {
    //use effects esta aqui para quando o componente for criado ja chamar a funcao getalunos porem ela agora ao inves de criar campos vazios vai colocar os dados do aluno que foi solicitado.
    getAlunos();
  }, []);

  const getAlunos = () => {
    if (alunos.length > 0) {
      alunos.forEach((aluno) => {
        //para cada aluno solicitado
        if (aluno.id === parseInt(id)) {
          //confere se os ids sao iguais e coloca os dados do aluno solicitado
          setNome(aluno.nome);
          setIdade(aluno.idade);
          setCidade(aluno.cidade);
        }
      });
    } else {
      axios.get(API_URL).then((response) => {
        setAlunos(response.data);
        response.data.forEach((aluno) => {
          //para cada aluno solicitado
          if (aluno.id === parseInt(id)) {
            //confere se os ids sao iguais e coloca os dados do aluno solicitado
            setNome(aluno.nome);
            setIdade(aluno.idade);
            setCidade(aluno.cidade);
          }
        });
      });
    }
  };

  const cadastrarAlunos = () => {
    if (id) {
      axios
        .put(API_URL, {
          id,
          nome,
          idade,
          cidade,
        })
        .then((response) => {
          if (response.status === 200) {
            axios.get(API_URL).then((response) => {
              setAlunos(response.data);
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
        .post(API_URL, {
          nome,
          idade,
          cidade,
        })
        .then((response) => {
          if (response.status === 201) {
            axios.get(API_URL).then((response) => {
              setAlunos(response.data);
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
    setNome("");
    setIdade("");
    setCidade("");
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
      {alunos.length > 0 ? (
        <Form>
          <InputCadastro
            label="Nome"
            variant="outlined"
            value={nome} //pra depois que cadastrar ele colocar valor vazio que vem da funcao liparcampos
            onChange={(e) => setNome(e.target.value)} //o evento onchange altera os estados
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
            {id ? "Editar" : "Cadastrar"}
          </ButtonCadastro>
        </Form>
      ) : (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </Box>
  );
};

export default CadastrarAlunos;
