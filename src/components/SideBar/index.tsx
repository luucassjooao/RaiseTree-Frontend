import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import ReactPortal from '../ReactPortal';
import { Container, Overlay } from './styles';

const colorLiterals = {
  DarkPurple: '#240046',
  LightPurple: '#560bad',
  GrayPurple: '#3C096C',
  YellowMain: '#FFBD00',
};

type PropsSideBar = {
  side: 'left' | 'right';
  size: number;
  colorBackground: 'DarkPurple' | 'LightPurple' | 'GrayPurple' | 'YellowMain';
  visible: boolean;
  children: JSX.Element | JSX.Element[];
}

export default function SideBar({
  side, size, colorBackground, visible, children,
}: PropsSideBar) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-side-bar">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <Container
          side={side}
          size={size}
          colorBackground={colorLiterals[colorBackground]}
          isLeaving={!visible}
        >
          {children}
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
