import React, { useState } from "react";
import {
  Button,
  TextField,
  ThemeProvider,
  Typography
} from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import axios from "axios";
import { db } from "../../dataBase/db";
import { useLiveQuery } from "dexie-react-hooks";
import { FormContainer } from "./styles";
import { useHistory } from "react-router-dom";

const Register: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function register() {
    try {
      const real = 100000;
      const bitcoin = 0;
      const brita = 0;
      const id = await db.users.add({
        name,
        email,
        password,
        real,
        bitcoin,
        brita,
      });

      alert(`Usuário ${name} registrado com sucesso.`);
      setName("");
      setEmail("");
      setPassword("");
      history.push('/login');
    } catch (error) {
      alert(`Falha ao criar usuário.`);
    }
  }

  return (
    <ContainerPage>
      <FormContainer>
        <Typography variant="h5">Cadastre-se</Typography>
        <TextField
          required
          id="name"
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <TextField
          required
          id="email"
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <TextField
          required
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button variant="contained" size="medium" onClick={register}>
          Registrar
        </Button>
      </FormContainer>
    </ContainerPage>
  );
};

export default Register;
