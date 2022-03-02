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

interface NewTransactionProps {
  onClick: () => void;
  user?: User;
  cotacaoDolar?: CotacaoDolarResult;
}

const NewTransaction: React.FunctionComponent<NewTransactionProps> = ({
  onClick,
  user,
  cotacaoDolar,
}) => {
  const [optionFrom, setOptionFrom] = useState("");
  const [optionTo, setOptionTo] = useState("");
  const [buy, setBuy] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [able, setAble] = useState(false);

  function handleChange(value: any, name: any) {
    if (name == "from") setOptionFrom(value);
    else setOptionTo(value);
  }

  function handleTransaction(value: number) {
      console.log('ssssssssssss', cotacaoDolar, optionTo);
    setBuy(value);
    if (optionTo == "brita" && cotacaoDolar) {
        const trans = (value * cotacaoDolar?.cotacaoVenda) * cotacaoDolar?.cotacaoVenda;
        const test = user && user?.real - trans;
        if (test && test > 0) {
            setAble(true);
            console.log('djfhksdjfh', test);
        }
        setTransactionValue((value * cotacaoDolar?.cotacaoVenda) * cotacaoDolar?.cotacaoVenda);
    }
  }
  if (!user) return <>loading</>;

  function handleConfirm() {
      if (able) db.users.update(user?.id ? user?.id : 0, {real: transactionValue, brita: buy}).then(function (updated) {
        if (updated)
          alert("Transação realizada com sucesso");
        else
          alert("Não foi possível realizar a transação");
      }) ;
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
            <MenuItem value="real">Real</MenuItem>
            <MenuItem value="bitcoin">Bitcoin</MenuItem>
            <MenuItem value="brita">Brita</MenuItem>
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
            <MenuItem value="real">Real</MenuItem>
            <MenuItem value="bitcoin">Bitcoin</MenuItem>
            <MenuItem value="brita">Brita</MenuItem>
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
      <Button variant="contained" color="primary" onClick={handleConfirm}>Concluir transação</Button>
    </ModalContainer>
  );
};

export default NewTransaction;
