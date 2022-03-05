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
import ModalContainer from "../../../components/modalContainer/ModalContainer";
import TransactionRow from "../../../components/transactionRow/TransactionRow";
import { db, TransactionType, User } from "../../../dataBase/db";
import { useAppSelector } from "../../../store";

interface StatementProps {
  onClick: () => void;
}

const Statement: React.FunctionComponent<StatementProps> = ({ onClick }) => {
  const { user } = useAppSelector((store) => store.rootReducer.criptoBank);

  return (
    <ModalContainer onClick={onClick}>
      <Typography variant="h5">Extrato de transações</Typography>
      <div>
        {user.transaction.map((trans: TransactionType, i: number) => (
          <TransactionRow key={i} selled={trans.selled} bought={trans.bought} />
        ))}
      </div>
    </ModalContainer>
  );
};

export default Statement;
