import { redirect } from 'react-router-dom'

export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return null; // this is missing in the next lecture video and should be added by you
}