import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Container, Home, Data, HeaderContainer } from "./styles";

const ContainerPage: React.FunctionComponent = ({ children }) => {
  return (
    <Container>
        <HeaderContainer>
            <Typography
              style={{
                fontSize: "40px",
                color: 'white',
                font: "Roboto",
              }}
              variant="h1"
            >
              CriptoBank
            </Typography>
        </HeaderContainer>
      <Home>
        <Data>{children}</Data>
      </Home>
    </Container>
  );
};

export default ContainerPage;
