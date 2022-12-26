import { StyledSpinner } from './style';

type TSpinner = {
  size: number;
  isBackgroundLight?: boolean;
}

export default function Spinner({ size, isBackgroundLight = true }: TSpinner) {
  return <StyledSpinner size={size} isBackgroundLight={isBackgroundLight} />;
}
