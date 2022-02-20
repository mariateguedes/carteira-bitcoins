import React, { useEffect, useState } from "react";
import { Box, ThemeProvider, Typography } from "@material-ui/core";
import ContainerPage from "../../components/containerPage/ContainerPage";
import { CotaçãoDolarResult, CotacaoBitcoinResult } from "../../api/Models";
import axios from "axios";
import { getApiMercadoBitcoin, getCotacaoDolar } from "../../api/Api";

const Home: React.FunctionComponent = () => {
  const [ data, setData ] = useState<CotacaoBitcoinResult>();
  const [ cotacaoDolar, setCotacaoDolar ] = useState<CotaçãoDolarResult>();

  useEffect(() => {
    getApiMercadoBitcoin().then(res => { return setData(res) });
    getCotacaoDolar().then(res => { return setCotacaoDolar(res.value[0]) });    
  }, []);

  return (
    <ContainerPage>
      <div>Cotação Bitcoin:</div>
      <div>Valor venda: {Number(data?.sell).toFixed(2)}</div>
      <div>Valor compra: {Number(data?.sell).toFixed(2)}</div>

      <div>Cotação dolar:</div>
      <div>Valor venda: {Number(cotacaoDolar?.cotacaoVenda).toFixed(2)}</div>
      <div>Valor compra: {Number(cotacaoDolar?.cotacaoCompra).toFixed(2)}</div>
    </ContainerPage>
  );
};

export default Home;
