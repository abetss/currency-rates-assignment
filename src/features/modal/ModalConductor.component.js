import React from 'react';
import ReactModal from 'react-modal';
import { ErrorModal } from './components';
import { MODAL_TYPE } from './connectors';

const contentStyles = {
  content: {
    backgroundColor: '#fff',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.7)'
  }
};

export const ModalConductor = ({ isModalOpen, hideModal, modalType, modalProps: { message }, ...props }) => (
  <ReactModal
    style={contentStyles}
    isOpen={isModalOpen}
    shouldCloseOnOverlayClick={true}
    shouldCloseOnEsc={true}
    shouldFocusAfterRender={true}
    onRequestClose={hideModal}
    ariaHideApp={false}
  >
    {modalType === MODAL_TYPE.ERROR_MODAL && <ErrorModal message={message} onCloseButtonClick={hideModal} />}
  </ReactModal>
);
