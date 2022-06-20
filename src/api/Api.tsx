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
};

export const getApiCotacaoDolar = (date: string) => {
  return axios
    .get(
      `https://economia.awesomeapi.com.br/all/USD-BRL`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
