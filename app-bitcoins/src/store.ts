import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { RootStateOrAny, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import criptoBankReducer from './features/CriptoBankSlice';

const rootReducer = combineReducers({
    criptoBank: criptoBankReducer
  });
  
export const store = configureStore({
  reducer: {rootReducer},
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateOrAny> = useSelector;