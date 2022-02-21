import React, { useEffect, useState } from "react";
import { Box, ThemeProvider, Typography } from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import { CotaçãoDolarResult, CotacaoBitcoinResult } from "../../api/Models";
import axios from "axios";
import { getApiMercadoBitcoin, getCotacaoDolar } from "../../api/Api";
import ValuesContainer from "../../components/valuesContainer/ValuesContainer";
import { useAuthentication } from "../../authentication/AuthenticationProvider";
import { db, User } from "../../dataBase/db";

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
        <ValuesContainer
          title="Cotação Bitcoin"
          sell={data.sell}
          buy={data.buy}
          type="real"
        />
        <ValuesContainer
          title="Cotação dólar"
          sell={String(cotacaoDolar.cotacaoVenda)}
          buy={String(cotacaoDolar?.cotacaoCompra)}
          type="dol"
        />
        <div>Real: {user?.real}</div>
        <div>Bitcoin: {user?.bitcoin}</div>
        <div>Brita: {user?.brita}</div>
      </ContainerPage>
    </>
  );
};

export default Home;
