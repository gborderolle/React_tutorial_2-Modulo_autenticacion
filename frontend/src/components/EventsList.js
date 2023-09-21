import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classes from './EventsList.module.css';

function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <h1>Todos los eventos</h1>
      <ul className={classes.list}>
        {Array.isArray(events) ? (
          events.map((event) => (
            <li key={event.id} className={classes.item}>
              <Link to={event.id}>
                <img src={event.image} alt={event.title} />
                <div className={classes.content}>
                  <h2>{event.title}</h2>
                  <time>{event.date}</time>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default EventsList;
