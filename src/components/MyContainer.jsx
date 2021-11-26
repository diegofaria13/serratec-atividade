import { useContext } from "react";
import TemaContext from "../context/tema";
import tema from "../tema";

const MyContainer = (props) => {
    const { temaSelecionado } = useContext(TemaContext);
    return <div style={tema[temaSelecionado]}>{props.children}</div>
};

export default MyContainer;