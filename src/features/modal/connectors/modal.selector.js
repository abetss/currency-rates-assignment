import { createStructuredSelector } from 'reselect';

const selectIsModalOpen = state => state.modal.isOpen;
const selectModalType = state => state.modal.modalType;
const selectModalProps = state => state.modal.modalProps;

export const modalSelector = createStructuredSelector({
  isModalOpen: selectIsModalOpen,
  modalType: selectModalType,
  modalProps: selectModalProps
});
