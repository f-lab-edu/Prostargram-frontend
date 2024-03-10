import { createBrowserRouter } from 'react-router-dom';

import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import GithubSignupPage from '@pages/GithubSignupPage';
import AdditionalInfoPage from '@pages/AdditionalInfoPage';
import AuthLayout from '@components/layouts/AuthLayout';

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
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <SignupPage />,
      },
      {
        path: 'github',
        element: <GithubSignupPage />,
      },
      {
        path: 'info',
        element: <AdditionalInfoPage />,
      },
    ],
  },
]);

export default router;
