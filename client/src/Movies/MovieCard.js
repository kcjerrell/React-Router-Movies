import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';


export default function MovieCard(props) {
  const [movie, setMovie] = useState(props.movie);

  const { movieId } = useParams();

  useEffect(() => {
    if (movie)
      return;
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`) // Study this endpoint with Postman
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movieId, movie]);

  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = evt => { }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  const id = props.id ? props.id : movie.id;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <Link to={`/movies/${id}`}>
          <h2>{title}</h2>
        </Link>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>

        {stars &&
          <h3>Actors</h3>
        }
        {stars && stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}

      </div>
      <div className="save-button">Save</div>
    </div>
  );
}