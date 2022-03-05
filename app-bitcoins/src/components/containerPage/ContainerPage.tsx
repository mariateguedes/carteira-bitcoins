import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useAuthentication } from "../../authentication/AuthenticationProvider";
import {
  Container,
  Home,
  Data,
  HeaderContainer,
  UserContainer,
} from "./styles";
import { AccountCircle } from "@material-ui/icons";

const ContainerPage: React.FunctionComponent = ({ children }) => {
  const { userId, userName } = useAuthentication();
  return (
    <>
      <Container>
        <HeaderContainer>
          <Typography
            style={{
              fontSize: "40px",
              color: "white",
              font: "Roboto",
            }}
            variant="h1"
          >
            CriptoBank
          </Typography>
          {userName && (
            <UserContainer>
              <AccountCircle />
              <Typography variant="h6">
                {userName.split(" ").shift()}
              </Typography>
            </UserContainer>
          )}
        </HeaderContainer>
        <Home>
          <Data>{children}</Data>
        </Home>
      </Container>
    </>
  );
};

export default ContainerPage;
