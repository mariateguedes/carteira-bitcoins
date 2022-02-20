export interface CotacaoBitcoinResult {
    high: string;
    low: string;
    vol: string;
    last: string;
    buy: string;
    sell: string;
    open: string;
    date: number;
}

export interface CotaçãoDolarResult {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: Date;
}