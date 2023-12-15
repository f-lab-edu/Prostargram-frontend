import AuthLayout from '@components/layouts/AuthLayout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Main</div>,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <div>Login Page</div>,
      },
      {
        path: 'sign-up',
        element: <div>Sign Up Page</div>,
      },
    ],
  },
]);

export default router;
