import { TransactionValues, User } from "../../../api/Models";
import { db } from "../../../dataBase/db";

export function confirmTransaction(transactionValues: TransactionValues, user: User) {

  if (!transactionValues.able)
    alert("Saldo insuficiente para completar transação.");
  let newTransaction = {
    selled: {
      name: transactionValues.optionFrom,
      value: transactionValues.sellValue,
    },
    bought: {
      name: transactionValues.optionTo,
      value: transactionValues.boughtValue,
    },
  };
  let transactionList = [];
  if (user?.transaction)
    transactionList = [...user.transaction, newTransaction];
  else transactionList = [newTransaction];
  if (transactionValues.able && user)
    db.users
      .update(user?.id ? user?.id : 0, {
        [transactionValues.optionFrom]:
          user[transactionValues.optionFrom] - transactionValues.sellValue,
        [transactionValues.optionTo]:
          user[transactionValues.optionTo] + transactionValues.boughtValue,
        transaction: transactionList,
      })
      .then(function (updated) {
        if (updated) {
          alert("Transação realizada com sucesso");
        } else alert("Não foi possível realizar a transação");
      });
}

