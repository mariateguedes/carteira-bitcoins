import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Option } from "../../../api/Models";
import CurrencySelection from "../../../components/currencySelection/CurrencySelection";
import ModalContainer from "../../../components/modalContainer/ModalContainer";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setTransactionValues } from "../../CriptoBankSlice";
import { confirmTransaction } from "./ConfirmTransaction";

interface NewTransactionProps {
  onClick: () => void;
}

const NewTransaction: React.FunctionComponent<NewTransactionProps> = ({
  onClick,
}) => {
  const [optionFrom, setOptionFrom] = useState<Option>("real");
  const [optionTo, setOptionTo] = useState<Option>("brita");
  const [buy, setBuy] = useState(0);
  const [boughtValue, setBoughtValue] = useState(0);
  const [transactionValue, setTransactionValue] = useState(0);
  const [sellValue, setSellValue] = useState(0);
  const dispatch = useAppDispatch();

  const { cotacaoBitcoin, cotacaoDolar, cotacaoReal, user, transactionValues } =
    useAppSelector((store) => store.rootReducer.criptoBank);

  function handleChange(value: any, name: any) {
    if (name == "optionFrom") setOptionFrom(value);
    else setOptionTo(value);
  }

  const moedas = {
    brita: cotacaoDolar,
    bitcoin: cotacaoBitcoin,
    real: cotacaoReal,
  };

  function handleTransaction(value: number) {
    setBuy(value);
    const transaction = value * moedas[optionFrom].sell * moedas[optionTo].buy;
    const balance = user[optionFrom] - transaction / moedas[optionFrom].sell;

    setTransactionValue(transaction);
    let bough = 0;
    if (optionTo == "real") bough = transaction;
    else bough = value;

    dispatch(
      setTransactionValues({
        able: balance > 0,
        optionFrom: optionFrom,
        optionTo: optionTo,
        sellValue: transaction / moedas[optionFrom].sell,
        boughtValue: bough,
      })
    );
  }

  return (
    <ModalContainer onClick={onClick}>
      <Typography variant="h5">Fazer nova transação</Typography>
      <Grid container direction="row" justifyContent="space-around">
        <CurrencySelection
          label="Vender"
          value={optionFrom}
          onChange={handleChange}
          name="optionFrom"
        />
        <CurrencySelection
          label="Comprar"
          value={optionTo}
          onChange={handleChange}
          name="optionTo"
        />
      </Grid>
      <Grid container direction="row" justifyContent="center">
        <Typography>
          Valor na carteira em {optionFrom}: {optionFrom == "real" && <>R$ </>}
          {user?.[optionFrom].toFixed(2)}
        </Typography>
      </Grid>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid container item xs={6} md={9}>
          <Typography>Quanto você quer comprar em {optionTo}?</Typography>
        </Grid>
        <Grid container item xs={6} md={3}>
          <TextField
            id="time"
            type="number"
            value={buy}
            onChange={(e) => handleTransaction(Number(e.target.value))}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="center">
        <Typography>
          Valor da transação em real: R$ {transactionValue.toFixed(2)}
        </Typography>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => confirmTransaction(transactionValues, user)}
      >
        Concluir transação
      </Button>
    </ModalContainer>
  );
};

export default NewTransaction;
