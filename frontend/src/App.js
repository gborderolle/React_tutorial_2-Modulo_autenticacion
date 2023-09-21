import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import Authentication, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    // Actualizar UI cuando se pierde el token de auth (hace logout) => oculta navs
    // Clase 353: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734232#overview
    loader: tokenLoader,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <Authentication />, action: authAction },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            // Opción 1:
            // Clase 318: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35733932#overview
            loader: eventsLoader,
          },
          {
            path: ':eventId',

            // usar useRouteLoaderData() cuando tiene ID
            // Clase 330: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734014#overview
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        // Cuando entra en la ruta logout, ejecuta la función action() del js Logout
        // Clase 352: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734228#overview
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
