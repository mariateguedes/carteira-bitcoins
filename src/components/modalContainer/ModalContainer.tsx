import React from "react";
import { ContainerData, ContainerIcon, Container } from "./styles";
import { IconButton, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface ModalContainerProps {
    onClick: () => void;
  }

const ModalContainer: React.FunctionComponent<ModalContainerProps> = ({ children, onClick }) => {
  return (
      <Container>
        <ContainerIcon>
          <IconButton onClick={onClick}>
            <Close />
          </IconButton>
        </ContainerIcon>
        <ContainerData>{children}</ContainerData>
      </Container>
  );
}

export default ModalContainer;
