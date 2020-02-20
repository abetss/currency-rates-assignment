import { connect } from 'react-redux';
import { ModalConductor } from './ModalConductor.component';
import { hideModal, modalSelector } from './connectors';

const mapDispatchToProps = {
  hideModal
};

export const ModalContainer = connect(modalSelector, mapDispatchToProps)(ModalConductor);
