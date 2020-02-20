import { combineReducers } from 'redux';
import { ratesReducer } from '../../features/rates';
import { modalReducer } from '../../features/modal';

export const rootReducer = combineReducers({ rates: ratesReducer, modal: modalReducer });
