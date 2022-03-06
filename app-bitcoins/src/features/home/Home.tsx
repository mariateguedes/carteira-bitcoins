import React, { useEffect, useState } from "react";
import { Button, Grid, Modal } from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import axios from "axios";
import ValuesContainer from "../../components/valuesContainer/ValuesContainer";
import { db } from "../../dataBase/db";
import WalletContainer from "../../components/walletContainer/WalletContainer";
import { useAuthentication } from "../../authentication/AuthenticationProvider";
import NewTransaction from "./newTransaction/NewTransaction";
import { useDispatch } from "react-redux";
import {
  getCotacaoBitcoin,
  getCotacaoDolar,
  setUser,
} from "../CriptoBankSlice";
import { useAppSelector } from "../../store";
import { Transform, Receipt } from "@material-ui/icons";
import Statement from "./statement/Statement";

async function getUserData(userId: number) {
  try {
    return await db.users.where({ id: userId }).first();
  } catch {
    alert("Não foi possível fazer login. Tente novamente.");
  }
}

const Home: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [openStatement, setOpenStatement] = useState(false);
  const { userId, userName } = useAuthentication();
  const dispatch = useDispatch();

  const { cotacaoBitcoin, cotacaoDolar, user, transactionValues } = useAppSelector(
    (store) => store.rootReducer.criptoBank
  );

  if (userId == undefined) return null;

  useEffect(() => {
    getUserData(userId).then((res) => {
      dispatch(setUser(res));
    });
    dispatch(getCotacaoDolar());
    dispatch(getCotacaoBitcoin());
  }, [open]);

  return (
    <ContainerPage>
      <Grid container direction="row" spacing={2}>
        <Grid direction="column" container item xs={6} md={6}>
          <WalletContainer
            title="Real"
            value={String(user?.real)}
            type="real"
          />
          <WalletContainer title="Bitcoin" value={String(user.bitcoin)} />
          <WalletContainer title="Brita" value={String(user.brita)} />
        </Grid>
        <Grid
          direction="column"
          container
          item
          xs={6}
          md={6}
          alignItems="center"
        >
          <Grid
            direction="column"
            container
            justifyContent="center"
            alignItems="center"
            style={{ rowGap: "1rem" }}
          >
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              endIcon={<Transform />}
              size="medium"
            >
              Fazer transação
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <NewTransaction onClick={() => setOpen(false)} />
            </Modal>
            <Button
              variant="contained"
              onClick={() => setOpenStatement(true)}
              endIcon={<Receipt />}
            >
              Visualizar Extrato
            </Button>
            <Modal open={openStatement} onClose={() => setOpenStatement(false)}>
              <Statement onClick={() => setOpenStatement(false)} />
            </Modal>
          </Grid>
          <ValuesContainer
            title="Cotação Dolar"
            sell={cotacaoDolar && cotacaoDolar.sell.toString()}
            buy={cotacaoDolar && cotacaoDolar.buy.toString()}
            type="dol"
          />
          <ValuesContainer
            title="Cotação Bitcoin"
            sell={cotacaoBitcoin && cotacaoBitcoin.sell}
            buy={cotacaoBitcoin && cotacaoBitcoin.buy}
            type="real"
          />
        </Grid>
      </Grid>
    </ContainerPage>
  );
};

export default Home;
