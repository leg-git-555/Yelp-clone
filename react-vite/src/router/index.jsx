import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import { Homepage } from '../components/Homepage/Homepage';
import { CreateBusiness } from '../components/CreateBusinessForm/CreateBusiness';
import { ManageBusinesses } from '../components/ManageBusinesses/ManageBusinesses';
import { UpdateBusiness } from '../components/UpdateBusiness/UpdateBusiness';
import { Business } from '../components/Business/Business';
import { CreateReview } from '../components/CreateReviewForm/CreateReview';

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
        path: "businesses/:bizId",
        element: <Business />,
      },
      {
        path: "/businesses/current",
        element: <ManageBusinesses />,
      },
      {
        path: "/businesses/:id/edit",
        element: <UpdateBusiness />
      },
      {
        path: "/businesses/:bizId/reviews/new",
        element: <CreateReview />
      },
    ],
  },
]);