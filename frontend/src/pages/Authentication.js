import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

// Clase 348: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35734204#overview
// Authentication
// Ejecuta con el form submit
export async function action({ request }) {
  // useSearchParams() no funciona porque no estamos en un componente acá
  // Alternativa:
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    // Tirar un error controlado
    throw json({ message: 'Modo no soportado.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:3002/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'No se pudo autenticar.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  // token handling
  return redirect('/');
}
