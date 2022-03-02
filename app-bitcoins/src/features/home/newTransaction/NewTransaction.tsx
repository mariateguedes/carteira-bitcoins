import React, { useEffect, useState } from "react";
import ModalContainer from "../../../components/modalContainer/ModalContainer";

interface NewTransactionProps {
    onClick: () => void;
  }

const NewTransaction: React.FunctionComponent<NewTransactionProps> = ({onClick}) => {

  return (
    <ModalContainer onClick={onClick}>
      <div>Fazer nova transação</div>
    </ModalContainer>
  );
};

export default NewTransaction;
