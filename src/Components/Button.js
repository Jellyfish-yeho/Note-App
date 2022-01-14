import styled, { css } from "styled-components";

const Btn = styled.button`
    position: absolute;
    bottom: 3%;
    border: 0.2rem solid #33322e;
    border-radius: 1rem;
    box-shadow: 0.2rem 0.2rem 0 #33322e;
    padding: 1rem 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #F9F3E5;
    cursor: pointer;
    ${(props) => props.normal && 
        css`
        background-color: #878787;
    `}
    ${(props) => props.add && css`
        background-color: #f19066;
        right: 5%;
    `}
`;

function Button({text, ...props}){
    return (
        <Btn {...props}>
            {text}
        </Btn>    
    );
}

export default Button;