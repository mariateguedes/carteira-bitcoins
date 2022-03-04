import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import axios from "axios";
import { db } from "../../dataBase/db";
import { useLiveQuery } from "dexie-react-hooks";
import { FormContainer } from "./styles";

const Register: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

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

      setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  const users = useLiveQuery(() => db.users.toArray());

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
      <div>
        <ul>
          {users?.map((friend: any) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
        </ul>
      </div>
    </ContainerPage>
  );
};

export default Register;
