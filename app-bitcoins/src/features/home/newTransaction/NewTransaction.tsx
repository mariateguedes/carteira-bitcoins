import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalContainer from "../../../components/modalContainer/ModalContainer";
import { db, TransactionType, User } from "../../../dataBase/db";
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
}

type Option = 'real' | 'brita' | 'bitcoin';

const NewTransaction: React.FunctionComponent<NewTransactionProps> = ({
  onClick
}) => {
  const [optionFrom, setOptionFrom] = useState<Option>('real');
  const [optionTo, setOptionTo] = useState<Option>('brita');
  const [buy, setBuy] = useState(0);
  const [boughtValue, setBoughtValue] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const [able, setAble] = useState(false);
  const history = useHistory();

  const { cotacaoBitcoin, cotacaoDolar, cotacaoReal, user } = useAppSelector(
    (store) => store.rootReducer.criptoBank
  );

  function handleChange(value: any, name: any) {
    if (name == "from") setOptionFrom(value);
    else setOptionTo(value);
  }

  const moedas = {
    brita: cotacaoDolar,
    bitcoin: cotacaoBitcoin,
    real: cotacaoReal,
  };
  

  function handleTransaction(value: number) {
    setBuy(value);

    if (!user) {
      throw new Error("SEM Balanço");
    }
    const transaction = value * moedas[optionFrom].sell * moedas[optionTo].buy;
    const balance = (user)[optionFrom] - (transaction / moedas[optionFrom].sell);

    setAble(balance > 0);
    setTransactionValue(transaction);
    setSellValue(transaction /  moedas[optionFrom].sell);
    if (optionTo == 'real') setBoughtValue(transaction)
    else setBoughtValue(value)

  }
  if (!user) return <>loading</>;

  function handleConfirm() {
    if (!able) alert("Saldo insuficiente para completar transação.");
    let newTransaction = {
      selled: {
        name: optionFrom,
        value: sellValue
      },
      bought: {
        name: optionTo,
        value: boughtValue
      }
    }
    let transactionList = [];
    if (user?.transaction) transactionList = [...user.transaction, newTransaction];
    else transactionList = [newTransaction];
    if (able && user)
      db.users
        .update(user?.id ? user?.id : 0, {
            [optionFrom]: user[optionFrom] - sellValue,
            [optionTo]: user[optionTo] + buy,
            transaction: transactionList
        })
        .then(function (updated) {
          if (updated) {alert("Transação realizada com sucesso"); onClick()}
          else alert("Não foi possível realizar a transação");
        });
  }

  return (
    <ModalContainer onClick={onClick}>
      <Typography variant="h5">Fazer nova transação</Typography>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
        <FormControl>
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
        <FormControl>
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
      { (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
          <Typography>Valor na carteira em {optionFrom}: {optionFrom == 'real' && (<>R$</>)}{user?.[optionFrom].toFixed(2)}</Typography>
        </div>
      )}
      {(
        <>
        <div style={{display: 'grid', justifyContent: 'center'}}>
          <TextField
            size="medium"
            id="time"
            type="number"
            label={`Quanto comprar em ${optionTo}?`}
            value={buy}
            onChange={(e) => handleTransaction(Number(e.target.value))}
          />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
          <Typography>Valor da transação em real: R$ {transactionValue.toFixed(2)}</Typography>
          </div>
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Concluir transação
      </Button>
    </ModalContainer>
  );
};

export default NewTransaction;
