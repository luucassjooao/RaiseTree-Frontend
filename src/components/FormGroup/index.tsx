import Spinner from '../Spinner';
import { Container } from './style';

type TFormGroup = {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[];
  isLoading?: boolean;
  error?: string;
}

export default function FormGroup({ children, isLoading, error }: TFormGroup) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
        <div className="loader">
          <Spinner size={22} isBackgroundLight />
        </div>
        )}
      </div>
      {error && <small style={{ display: 'block' }}>{error}</small>}
    </Container>
  );
}
