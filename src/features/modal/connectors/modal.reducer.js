import { MODAL_SHOW, MODAL_HIDE } from './modal.action';

const initialState = {
  isOpen: false,
  modalType: null,
  modalProps: {}
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      const { modalType, modalProps } = action.payload;
      return {
        isOpen: true,
        modalType,
        modalProps
      };
    case MODAL_HIDE:
      return initialState;
    default:
      return state;
  }
};
