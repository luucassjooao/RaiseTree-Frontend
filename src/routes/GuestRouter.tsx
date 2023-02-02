import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Active from '../pages/active';
import ActiveTeacher from '../pages/activeTeacher';
import FormCreateOrganization from '../pages/formCreateOrganization';
import LP from '../pages/LP';
import Login from '../pages/login';
import Register from '../pages/register';
import VerifyEmail from '../pages/verifyEmail';

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
    path: '/activeTeacher',
    element: <ActiveTeacher />,
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
    element: <VerifyEmail />,
  },
  {
    path: '/*',
    element: <LP />,
  },
];
