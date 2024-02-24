import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const IssuesAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/issues/:id',
      component: lazy(() => import('./IssuesApp'))
    },
    {
      path: '/apps/issues',
      component: () => <Redirect to="/apps/issues/all" />
    }
  ]
};

export default IssuesAppConfig;
