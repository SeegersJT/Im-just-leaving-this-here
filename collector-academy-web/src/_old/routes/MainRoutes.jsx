import { lazy } from 'react';

// project import
import Loadable from '_old/components/Loadable';
import Dashboard from '_old/layout/Dashboard';

const Color = Loadable(lazy(() => import('_old/pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('_old/pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('_old/pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('_old/pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('_old/pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
