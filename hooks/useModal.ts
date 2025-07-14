import { useState } from "react";
import { ModalType } from "../enums/modalTypes";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalProps, setModalProps] = useState<any>(null); 

  const show = (type: ModalType, props?: any) => {
    setModalType(type);
    setModalProps(props || {});
    setIsShowing(true);
  };

  const hide = () => {
    setIsShowing(false);
    setModalType(null);
    setModalProps(null);
  };

  return {
    isShowing,
    modalType,
    modalProps,
    show,
    hide,
  };
};

export default useModal;
