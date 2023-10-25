import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [actorList, setActorList] = useState([]);
  const [actorTopMovies, setActorTopMovies] = useState({});

  const getMovies = () => {
    Axios.get("http://localhost:3001/moviestop").then((response) => {
      setMovieList(response.data);
    });
  };

  const getActors = () => {
    Axios.get("http://localhost:3001/actors").then((response) => {
      setActorList(response.data);
    });
  };
  const getActorTopMovies = (actorId) => {
    Axios.get(`http://localhost:3001/actor/${actorId}/topmovies`)
      .then((response) => {
        setActorTopMovies((prevState) => ({
          ...prevState,
          [actorId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching top movies for actor:", error);
      });
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getActors();
  }, []);

  useEffect(() => {
    // Map over the actorList and fetch top movies for each actor
    actorList.forEach((actor) => {
      getActorTopMovies(actor.actor_id);
    });
  }, [actorList]);

  return (
    <div>
      <div className="contain">
        <h1> Top 5 Movies:</h1>
        <div className="details">
          <ol>
            {movieList.map((movie, key) => {
              return (
                <li id={movie.film_id}>
                  <details>
                    <summary key={key}>{movie.title}</summary>
                    <div>
                      <div className="stat">Description:</div>{" "}
                      {movie.description}
                    </div>
                    <div>
                      <div className="stat">Rentals:</div> {movie.rented}
                    </div>
                    <div>
                      <div className="stat">Release Date:</div>
                      {movie.release_year}
                    </div>
                    <div>
                      <div className="stat">Length:</div> {movie.length} Minutes
                    </div>
                    <div>
                      <div className="stat">Rating:</div> {movie.rating}
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="contain">
        <h1>Top 5 Actors:</h1>
        <div className="details">
          <ol>
            {actorList.map((actor) => (
              <li key={actor.actor_id}>
                <details>
                  <summary>
                    {actor.first_name} {actor.last_name}
                  </summary>
                  <ol>
                    {actorTopMovies[actor.actor_id] ? (
                      actorTopMovies[actor.actor_id].map((movie) => (
                        <li key={movie.id}>{movie.title}</li>
                      ))
                    ) : (
                      <li>Loading...</li>
                    )}
                  </ol>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
