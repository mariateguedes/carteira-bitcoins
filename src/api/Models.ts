export interface CotacaoResult {
  sell: number;
  buy: number;
}

export interface Transaction {
  name: string;
  value: number;
}
export interface TransactionType {
  selled: Transaction;
  bought: Transaction;
}
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  real: number;
  bitcoin: number;
  brita: number;
  transaction?: TransactionType[];
}

export interface TransactionValues {
  able: boolean;
  optionFrom: Option;
  optionTo: Option;
  sellValue: number;
  boughtValue: number;
}

export type Option = "real" | "brita" | "bitcoin";

