import { Button, Grid, Modal, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ModalContainer from "../modalContainer/ModalContainer";
import { Container, Flex } from "./styles";

interface WalletContainerProps {
  title: string;
  value: string;
  type: "dol" | "real";
}

const WalletContainer: React.FunctionComponent<WalletContainerProps> = ({
  title,
  value,
  type,
}) => {
  return (
    <Container>
      <Typography variant="h5" color="textSecondary">
        {title}:
      </Typography>
      <Flex>
        <div>{value}</div>
      </Flex>
    </Container>
  );
};

export default WalletContainer;
