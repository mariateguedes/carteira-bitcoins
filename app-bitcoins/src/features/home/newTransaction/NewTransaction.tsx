import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CotacaoDolarResult } from "../../../api/Models";
import ModalContainer from "../../../components/modalContainer/ModalContainer";
import { db, User } from "../../../dataBase/db";
import { useAppSelector } from "../../../store";

interface Type {
  value: string;
  name: string;
}

const types: Type[] = [
  {
    value: "real",
    name: "Real",
  },
  {
    value: "bitcoin",
    name: "Bitcoin",
  },
  {
    value: "brita",
    name: "Brita",
  },
];

interface NewTransactionProps {
  onClick: () => void;
  user?: User;
  cotacaoDolar?: CotacaoDolarResult;
}

const NewTransaction: React.FunctionComponent<NewTransactionProps> = ({
  onClick,
  user,
}) => {
  const [optionFrom, setOptionFrom] = useState("");
  const [optionTo, setOptionTo] = useState("");
  const [buy, setBuy] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [able, setAble] = useState(false);

  const { cotacaoBitcoin, cotacaoDolar } = useAppSelector(
    (store) => store.rootReducer.criptoBank
  );

  function handleChange(value: any, name: any) {
    if (name == "from") setOptionFrom(value);
    else setOptionTo(value);
  }
  

  function handleTransaction(value: number) {
    setBuy(value);
    if (optionFrom == "real" && optionTo == "brita" && cotacaoDolar) {
      const transaction =
        value * cotacaoDolar.cotacaoVenda * cotacaoDolar.cotacaoVenda;
      const balance = user && user?.real - transaction;
      if (balance && balance > 0) setAble(true);
      setTransactionValue(transaction);
    }
    if (optionFrom == "real" && optionTo == "bitcoin" && cotacaoBitcoin) {
      const transaction = value * cotacaoBitcoin.buy;
      const balance = user && user?.real - transaction;
      if (balance && balance > 0) setAble(true);
      setTransactionValue(transaction);
    }
    if (optionFrom == "brita" && optionTo == "real" && cotacaoDolar) {
      const transaction =
        value * cotacaoDolar?.cotacaoVenda * cotacaoDolar?.cotacaoVenda;
      const balance = user && user?.brita - value;
      if (balance && balance > 0) setAble(true);
      setTransactionValue(transaction);
    }
    if (optionFrom == "bitcoin" && optionTo == "real" && cotacaoBitcoin) {
      const transaction = value * cotacaoBitcoin.sell;
      const balance = user && user?.bitcoin - value;
      if (balance && balance > 0) setAble(true);
      setTransactionValue(transaction);
    }
    if (
      optionFrom == "bitcoin" &&
      optionTo == "brita" &&
      cotacaoBitcoin &&
      cotacaoDolar
    ) {
      const transaction =
        value * cotacaoBitcoin.sell * cotacaoDolar?.cotacaoVenda;
      const balance =
        user && user?.brita * cotacaoDolar?.cotacaoVenda - transaction;
      if (balance && balance > 0) setAble(true);
      setTransactionValue(transaction);
    }
    if (
      optionFrom == "brita" &&
      optionTo == "bitcoin" &&
      cotacaoBitcoin &&
      cotacaoDolar &&
      user
    ) {
      const transaction = value * cotacaoDolar?.cotacaoCompra;
      const bitcoinDolar =
        user.bitcoin * cotacaoBitcoin.buy * cotacaoDolar.cotacaoVenda;
      const balance = user.brita * cotacaoDolar?.cotacaoVenda - bitcoinDolar;
      if (balance && balance > 0) setAble(true);
      setTransactionValue(transaction);
    }
  }
  if (!user) return <>loading</>;

  function handleConfirm() {
    if (!able) alert("Saldo insuficiente para completar transação.");
    if (able && user)
      db.users
        .update(user?.id ? user?.id : 0, {
          real: user?.real - transactionValue,
          brita: user?.brita + buy,
        })
        .then(function (updated) {
          if (updated) alert("Transação realizada com sucesso");
          else alert("Não foi possível realizar a transação");
        });
  }

  return (
    <ModalContainer onClick={onClick}>
      <div>Fazer nova transação</div>
      <div>
        <FormControl fullWidth>
          <InputLabel>Vender</InputLabel>
          <Select
            autoWidth
            value={optionFrom}
            name="from"
            onChange={(event) =>
              handleChange(event.target.value, event.target.name)
            }
          >
            {types.map((type: Type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel>Comprar</InputLabel>
          <Select
            value={optionTo}
            name="to"
            onChange={(event) =>
              handleChange(event.target.value, event.target.name)
            }
          >
            {types.map((type: Type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {optionFrom !== "" && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {optionFrom == "real" && <>Valor na carteira: {user?.real}</>}
          {optionFrom == "bitcoin" && <>Valor na carteira: {user?.bitcoin}</>}
          {optionFrom == "brita" && <>Valor na carteira: {user?.brita}</>}
        </div>
      )}
      {optionTo !== "" && (
        <>
          <TextField
            id="time"
            type="number"
            label={optionTo}
            value={buy}
            onChange={(e) => handleTransaction(Number(e.target.value))}
          />
          <div>Valor da transação em real: {transactionValue}</div>
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Concluir transação
      </Button>
    </ModalContainer>
  );
};

export default NewTransaction;
