import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import { Homepage } from '../components/Homepage/Homepage';
import { Test } from '../components/Test/Test';
import { CreateBusiness } from '../components/CreateBusinessForm/CreateBusiness';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "businesses/new",
        element: <CreateBusiness />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);