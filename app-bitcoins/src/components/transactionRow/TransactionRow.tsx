import React from "react";
import { RowContainer } from "./styles";
import { Typography } from "@material-ui/core";
import { Transaction } from "../../dataBase/db";
import { DoubleArrow } from "@material-ui/icons";

interface ModalContainerProps {
  selled: Transaction;
  bought: Transaction;
}

const TransactionRow: React.FunctionComponent<ModalContainerProps> = ({
  selled,
  bought,
}) => {
  return (
    <RowContainer>
      <Typography>
        {selled.name.charAt(0).toUpperCase() + selled.name.substr(1)} : {selled.name == 'real' ? `R$${selled.value.toFixed(2)}` : selled.value}
      </Typography>
      <DoubleArrow />
      <Typography>
        {bought.name.charAt(0).toUpperCase() + bought.name.substr(1)} : {bought.name == 'real' ? `R$${bought.value.toFixed(2)}` : bought.value}
      </Typography>
    </RowContainer>
  );
};

export default TransactionRow;
