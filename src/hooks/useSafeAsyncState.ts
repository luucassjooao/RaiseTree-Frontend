import { useCallback, useState } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncState<T>(initialState: any) {
  const [state, setState] = useState<T>(initialState);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncState];
}
