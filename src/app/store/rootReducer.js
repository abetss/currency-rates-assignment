import { combineReducers } from 'redux';
import { ratesReducer } from '../../features/rates';

export const rootReducer = combineReducers({ rates: ratesReducer });
