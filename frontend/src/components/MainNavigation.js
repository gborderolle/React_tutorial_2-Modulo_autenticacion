import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  // Get token para validar autenticación
  // Clase 353: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734232#overview
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/events'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/newsletter'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {!token && ( // Se muestra sólo si no está logueado (no hay token)
            <li>
              <NavLink
                to='/auth?mode=login'
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action='/logout' method='post'>
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
