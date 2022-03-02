import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, ThemeProvider, Typography } from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import { CotaçãoDolarResult, CotacaoBitcoinResult } from "../../api/Models";
import axios from "axios";
import { getApiMercadoBitcoin, getCotacaoDolar } from "../../api/Api";
import ValuesContainer from "../../components/valuesContainer/ValuesContainer";
import { db, User } from "../../dataBase/db";
import WalletContainer from "../../components/walletContainer/WalletContainer";
import { useAuthentication } from "../../authentication/AuthenticationProvider";
import ModalContainer from "../../components/modalContainer/ModalContainer";
import NewTransaction from "./newTransaction/NewTransaction";

async function getUserData(userId: number) {
  try {
    const user = await db.users.where({ id: userId }).first();
    return user;
  } catch {
    alert("Não foi possível fazer login. Tente novamente.");
  }
}

const Home: React.FunctionComponent = () => {
  const [data, setData] = useState<CotacaoBitcoinResult>();
  const [open, setOpen] = useState(false);
  const [cotacaoDolar, setCotacaoDolar] = useState<CotaçãoDolarResult>();
  const { userId, userName } = useAuthentication();
  const [user, setUser] = useState<User>();

  console.log("user", user);

  if (userId == undefined) return null;

  useEffect(() => {
    getApiMercadoBitcoin().then((res) => {
      return setData(res);
    });
    getCotacaoDolar().then((res) => {
      return setCotacaoDolar(res.value[0]);
    });
    getUserData(userId).then((res) => {
      return setUser(res);
    });
  }, []);

  if (data == undefined || cotacaoDolar == undefined) return null;

  return (
    <>
      <ContainerPage>
      <Button onClick={() => setOpen(true)}>Vender/Trocar</Button>
      <Modal open={open} onClose={() => setOpen(false)}><NewTransaction onClick={() => setOpen(false)}/></Modal>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <WalletContainer
            title="Real"
            value={String(user?.real)}
            type="real"
          />
          <ValuesContainer
            title="Cotação Bitcoin"
            sell={data.sell}
            buy={data.buy}
            type="real"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <WalletContainer
            title="Bitcoin"
            value={String(user?.bitcoin)}
            type="real"
          />
          <ValuesContainer
            title="Cotação Bitcoin"
            sell={data.sell}
            buy={data.buy}
            type="real"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <WalletContainer
            title="Brita"
            value={String(user?.brita)}
            type="real"
          />
        </div>
      </ContainerPage>
    </>
  );
};

export default Home;
