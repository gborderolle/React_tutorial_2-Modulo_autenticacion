import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Error 500';
  let message = 'Ocurrió un error en el servidor.';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Error 404';
    message = 'Recurso no encontrado.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
