import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiMercadoBitcoin, getApiCotacaoDolar } from "../api/Api";
import { CotacaoResult } from "../api/Models";

export const getCotacaoBitcoin = createAsyncThunk("getCotacaoBitcoin", async () =>
    getApiMercadoBitcoin()
);

export const getCotacaoDolar = createAsyncThunk(
  "getCotacaoDolar",
  async () => getApiCotacaoDolar()
);

interface FulFillmentUnitState {
    cotacaoDolar: CotacaoResult;
    cotacaoBitcoin: CotacaoResult;
    cotacaoReal: CotacaoResult;
  }

const initialState: FulFillmentUnitState = {
    cotacaoBitcoin: {
        buy: 0,
        sell: 0,
    },
    cotacaoDolar: {
      buy: 0,
      sell: 0,
    },
    cotacaoReal: {
      buy: 1,
      sell: 1,
    }
};

export const criptoBankSlice = createSlice({
  name: "criptoBanck",
  initialState,
  reducers: {
    /*setScroll: (state, action) => {
      state.scroll = action.payload;
    }*/
  },
  extraReducers: (builder) => {
    builder.addCase(getCotacaoBitcoin.fulfilled, (state, action) => {
        state.cotacaoBitcoin.buy = Number(parseFloat(action.payload.buy).toFixed(2));
        state.cotacaoBitcoin.sell = Number(parseFloat(action.payload.sell).toFixed(2));
    });
    builder.addCase(getCotacaoDolar.fulfilled, (state, action) => {
        state.cotacaoDolar.sell = action.payload.value[0].cotacaoVenda;
        state.cotacaoDolar.buy = action.payload.value[0].cotacaoCompra;
      });
  },
});

export const {  } =
  criptoBankSlice.actions;

export default criptoBankSlice.reducer;
