import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

// Loader
// Clase 321: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35733952#overview

export default function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch('http://localhost:3002/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
// loader()
// Clase 325: https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/35733980#overview
// useState() no se puede usar, porque una función no es un componente
export function loader() {
  return defer({
    events: loadEvents(),
  });
}


