import { Dashboard, DataUsers, Login, PageNotFound } from '../../pages';

const MenuRoutes = [
  {
    path: '/',
    exact: true,
    title: 'Login',
    component: () => <Login />,
  },
  {
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    component: () => <Dashboard />,
  },
  {
    path: '/data-users',
    exact: true,
    title: 'Data User',
    component: () => <DataUsers />,
  },

  {
    path: '/404',
    exact: false,
    component: () => <PageNotFound />,
  },
];

export default MenuRoutes;
