import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import axios from "axios";
import ValuesContainer from "../../components/valuesContainer/ValuesContainer";
import { db, User } from "../../dataBase/db";
import WalletContainer from "../../components/walletContainer/WalletContainer";
import { useAuthentication } from "../../authentication/AuthenticationProvider";
import ModalContainer from "../../components/modalContainer/ModalContainer";
import NewTransaction from "./newTransaction/NewTransaction";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { getCotacaoBitcoin, getCotacaoDolar } from "../CriptoBankSlice";
import { useAppSelector } from "../../store";

async function getUserData(userId: number) {
  console.log("cegando", userId);
  try {
    const user = await db.users.where({ id: userId }).first();
    console.log("useraqui", userId);
    return user;
  } catch {
    alert("Não foi possível fazer login. Tente novamente.");
  }
}

const Home: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const { userId, userName } = useAuthentication();
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();

  const { cotacaoBitcoin, cotacaoDolar } = useAppSelector(
    (store) => store.rootReducer.criptoBank
  );

  console.log("user", user);

  if (userId == undefined) return null;

  useEffect(() => {
    getUserData(userId).then((res) => {
      return setUser(res);
    });
    dispatch(getCotacaoDolar());
    dispatch(getCotacaoBitcoin());
  }, []);

  //if (cotacaoBitcoin == undefined || cotacaoDolar == undefined) return <>loading</>;

  return (
    <>
      <ContainerPage>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <WalletContainer
              title="Real"
              value={String(user?.real)}
              type="real"
            />
            <WalletContainer title="Bitcoin" value={String(user?.bitcoin)} />
            <WalletContainer title="Brita" value={String(user?.brita)} />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", justifyContent: 'center', width: "50%" }}
          >
            <Button onClick={() => setOpen(true)}>Vender/Trocar</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <NewTransaction
                onClick={() => setOpen(false)}
                user={user && user}
              />
            </Modal>
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
          </div>
        </div>
      </ContainerPage>
    </>
  );
};

export default Home;
