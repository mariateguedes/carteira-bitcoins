import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import { CotaçãoDolarResult, CotacaoBitcoinResult } from "../../api/Models";
import axios from "axios";
import { getApiMercadoBitcoin, getCotacaoDolar } from "../../api/Api";
import { db } from "../../dataBase/db";
import { useLiveQuery } from "dexie-react-hooks";
import { FormContainer } from "./styles";

const Register: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.users.add({
        name,
        email,
        password,
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
      <p>{status}</p>
      <FormContainer>
        <TextField
          required
          id="name"
          label="Nome"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <TextField
          required
          id="email"
          label="E-mail"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <TextField
          required
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <Button variant="contained" onClick={addFriend}>
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
