import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import { Container, Footer, Overlay } from './styled';

type TModal = {
  danger: boolean;
  visible: boolean;
  title: string;
  isLoading: boolean;
  children: JSX.Element | JSX.Element[];
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function Modal({
  danger,
  visible,
  title,
  isLoading,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  children,
}: TModal) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            {confirmLabel !== '' && (
            <Button
              size={150}
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
              style={{ color: '#FFF' }}
            >
              {confirmLabel}
            </Button>
            )}
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
