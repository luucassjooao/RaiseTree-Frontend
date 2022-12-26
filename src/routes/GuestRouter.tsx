import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Active from '../pages/active';
import FormCreateOrganization from '../pages/formCreateOrganization';
import LP from '../pages/landingPageCreateOrganization';
import Login from '../pages/login';
import Register from '../pages/register';
import VerifyEmai from '../pages/verifyEmail';

type GuestRouteType = {
  children: ReactNode;
};

export function GuestRoute({ children }: GuestRouteType) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  );
}

export const guestRouter = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/active',
    element: <Active />,
  },
  {
    path: '/hp',
    element: <LP />,
  },
  {
    path: '/corganization',
    element: <FormCreateOrganization />,
  },
  {
    path: '/ve',
    element: <VerifyEmai />,
  },
  {
    path: '/*',
    element: <LP />,
  },
];
