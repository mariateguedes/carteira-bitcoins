import { Typography } from "@material-ui/core";
import React from "react";
import { TransactionType } from "../../../api/Models";
import ModalContainer from "../../../components/modalContainer/ModalContainer";
import TransactionRow from "../../../components/transactionRow/TransactionRow";
import { db } from "../../../dataBase/db";
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
