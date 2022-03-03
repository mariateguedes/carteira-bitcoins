export interface CotacaoBitcoinResult {
    sell: number;
    buy: number;
}

export interface CotacaoDolarResult {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao?: Date;
}