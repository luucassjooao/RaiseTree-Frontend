import { Routes as Switch, Route } from 'react-router-dom';
import Header from '../components/global/Header';
import { GuestRoute, guestRouter } from './GuestRouter';
import { PrivateRouter, privateRouter } from './PrivateRouter';

export function Routes() {
  return (
    <Switch>
      {guestRouter.map((route) => (
        <Route
          key={Math.random()}
          path={route.path}
          element={(
            <GuestRoute>
              {route.element}
            </GuestRoute>
          )}
        />
      ))}

      {privateRouter.map((route) => (
        <Route
          key={Math.random()}
          path={route.path}
          element={(
            <>
              <Header />
              <PrivateRouter>
                {route.element}
              </PrivateRouter>
            </>
          )}
        />
      ))}
    </Switch>
  );
}
