import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import { Overlay } from './styles';

type TLoader = {
  isLoading: boolean
  theme?: 'blur' | 'light';
}

export default function Loader({ isLoading, theme }: TLoader) {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay themeBackground={theme!}>
        <Spinner size={90} isBackgroundLight={theme !== 'blur'} />
      </Overlay>
    </ReactPortal>
  );
}
