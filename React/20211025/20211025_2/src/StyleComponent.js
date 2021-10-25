import React from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
    background: ${(props) => props.color || "red"};
    padding: 2rem;
    display: flex;
`;
const Button = styled.button`
    background: yellow;
    border-radius: 5px;
    display: flex;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 400;
    &:hover {
        background: rgb(255, 0, 255);
    }

    ${(props) =>
        props.inverted &&
        css`
            background: none;
            color: green;
            border: 2px solid black;
            &:hover {
                background: red;
            }
        `}
`;

const StyleComponent = () => {
    return (
        <Box color="aqua">
            <Button>날눌러줘</Button>
            <Button inverted={true}>클릭하지마</Button>
        </Box>
    );
};

export default StyleComponent;
