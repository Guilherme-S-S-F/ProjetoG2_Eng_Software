import styled from "styled-components";

export const LoginDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`

export const LoginForm = styled.div`
    padding: 50px 60px;
    border-radius: 10px;
    background-color: #ffffff;
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    gap: 40px;
`

export const LoginInput = styled.input`
    padding: 5px;
    border: none;
    border-bottom: 2px #1100FFFF solid; 
`

export const LoginButton = styled.button`
    padding: 10px 80px;
    background-color: #1100FFFF;
    color: #ffffff;
    border: 2px solid #1100FFFF;
    font-weight: 700;
    cursor: pointer;
    transition: background 500ms ease;
    &:hover {
        background-color: #ffffff;
        color: #1100FFFF;
        border: 2px solid #1100FFFF;

    }
`

export const StyledBackground = styled.img`
    object-fit:cover;
    position:absolute;
    width: 100vw;
    height: 100vh;
    z-index: -2;
`

export const StyledBackgroundGradient = styled.div`
    position:absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background: linear-gradient(180deg, #1100FF00 0%, #1100FF70 70%, #1100FFFF 100%)
`