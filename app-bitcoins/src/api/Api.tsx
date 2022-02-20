import axios from "axios";

export const getApiMercadoBitcoin = () => {
    return axios
        .get("https://www.mercadobitcoin.net/api/BTC/ticker/")
        .then((res) => {
          const { ticker } = res.data;
          return ticker;
        })
        .catch((err) => {
          return err;
        });
  }
  
export const getCotacaoDolar = () => {
    return axios
        .get("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%2702-18-2022%27&$top=101&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          return err;
        });
  }