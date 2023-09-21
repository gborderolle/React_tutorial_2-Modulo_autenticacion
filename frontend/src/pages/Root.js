import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  // Clase 356: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734242#overview
  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' })
    }, 1 * 60 * 60 * 1000) // 1 hr
  }, [token, submit]); // useEffect() se ejecuta cuando cambia el valor de token

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
