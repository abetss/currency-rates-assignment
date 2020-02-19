import { connect } from 'react-redux';
import { ratesSelector, fetchRates } from './connectors';
import { RatesList } from './RatesList.component';

const mapDispatchToProps = {
  fetchRates
};

export const RatesListContainer = connect(
  ratesSelector,
  mapDispatchToProps
)(RatesList);
