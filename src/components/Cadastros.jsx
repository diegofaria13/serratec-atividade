import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Form = styled.form`
    display: flex;
    margin-top: 25px;
    flex-direction: column;
`;

const InputCadastro = styled(TextField)` //estiliza;'ao de componente vindo do material o textfield
    width: 500px;
    margin: 15px auto; //eixo y e eixo x
`;

const ButtonCadastro = styled(Button)`
    width: 500px;
    margin: 10px auto;
`;

export {Form, InputCadastro, ButtonCadastro};