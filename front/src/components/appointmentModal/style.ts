import styled from "styled-components";

export interface StyledModalProps {
    active: boolean
}

export const StyledModal = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'active',
})<StyledModalProps>`
    display: ${(props) => props.active? 'flex' : 'none'};
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #999797FF;
    border-radius: 16px;
    position: fixed;
    z-index: 999;
    background-color: #fff;
    left: 30%;
    right: 30%;
    top: 20%;
    bottom: 20%;
    padding: 50px;
`;

export const  StyledTopDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center
`

export const StyledCloseButton = styled.div`
    padding: 5px;
    cursor:pointer;
    background-color: #007FCDFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: #ffffff;
    transform: scale(1);
    transition: transform 500ms ease;
    &:hover {
        transform: scale(1.1);
    }
`

export const StyledInfo = styled.p`
    color: #676767FF;
    font-size: 14px;
`

export const StyledInfoInline = styled.div`
    display: flex;
    gap: 20px
`

export const SpaceBetweenDivVertical = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 20px;
`
