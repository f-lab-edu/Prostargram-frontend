import AuthLayout from '@components/layouts/AuthLayout';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdditionalInfoPage from './pages/AdditionalInfoPage';

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
        path: 'info',
        element: <AdditionalInfoPage />,
      },
    ],
  },
]);

export default router;
