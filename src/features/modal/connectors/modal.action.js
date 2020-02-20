export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';

export const showModal = (modalType, modalProps = {}) => ({
  type: MODAL_SHOW,
  payload: {
    modalType,
    modalProps
  }
});

export const hideModal = () => ({
  type: MODAL_HIDE,
  payload: {}
});
