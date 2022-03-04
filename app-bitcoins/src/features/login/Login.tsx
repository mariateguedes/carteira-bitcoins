import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import { db } from "../../dataBase/db";
import { FormContainer } from "../register/styles";
import { Link, useHistory } from "react-router-dom";
import { useAuthentication } from "../../authentication/AuthenticationProvider";

const Login: React.FunctionComponent = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthentication();

  async function login(email: string, password: string) {
    try {
      const user = await db.users
        .where({ email: email, password: password })
        .first();
      if (user?.id) {
          setUser(user?.id, user.name);
          history.push("/home");
      }
      return user;
    } catch {
      alert("Não foi possível fazer login. Tente novamente.");
    }
  }

  return (
    <ContainerPage>
      <FormContainer>
        <Typography variant="h5">Entrar</Typography>
        <TextField
          required
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <TextField
          required
          type="password"
          id="password"
          variant="outlined"
          label="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button variant="contained" onClick={() => login(email, password)}>
          Entrar
        </Button>
        <Typography variant="subtitle1">
          Ainda não é cliente? <Link to="/register">Inscreva-se</Link>
        </Typography>
      </FormContainer>
    </ContainerPage>
  );
};

export default Login;
