import {createPortal} from 'react-dom';

interface ModalPortalProps {
  children?: React.ReactNode;
}

const ModalPortal = ({children}: ModalPortalProps) => {
  const modalRoot = document.getElementById('modal')!;
  return createPortal(<>{children}</>, modalRoot);
};

export default ModalPortal;
