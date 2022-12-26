import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Activity from '../pages/activity';
import AdminRegisterStaticUser from '../pages/adminRegisterStaticUser';
import CreateActivity from '../pages/createActivity';
import CreateActivityDraft from '../pages/createActivityWithDraft';
import Draft from '../pages/draft';
import Home from '../pages/home';
import ListDraft from '../pages/listDraft';

type PrivateRouterType = {
  children: JSX.Element;
};

export function PrivateRouter({ children }: PrivateRouterType) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div style={{ marginTop: '70px' }}>
      { children }
    </div>
  );
}

export const privateRouter = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/createDraft',
    element: <Draft />,
  },
  {
    path: '/listDraft',
    element: <ListDraft />,
  },
  {
    path: '/createActivityDraft/:id',
    element: <CreateActivityDraft />,
  },
  {
    path: '/createActivity',
    element: <CreateActivity />,
  },
  {
    path: '/activity/:id',
    element: <Activity />,
  },
  {
    path: '/rsu',
    element: <AdminRegisterStaticUser />,
  },
  {
    path: '/*',
    element: <Home />,
  },
];
