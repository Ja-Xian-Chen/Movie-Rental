import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function Movies() {
  const [movieList, setMovieList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("1");

  const [customerId, setCustomerId] = useState("");
  const [filmId, setFilmId] = useState("");

  const getMovies = () => {
    Axios.get("http://localhost:3001/movies").then((response) => {
      setMovieList(response.data);
    });
  };

  const rentMovie = () => {
    const data = {
      customer_id: customerId,
      film_id: filmId,
    };

    Axios.post(`http://localhost:3001/movielist/${customerId}/${filmId}`, data)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Movie rented successfully!");
        } else {
          console.error("Movie rental request failed.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container">
      <input
        className="searchBar"
        type="text"
        placeholder="Search Movies..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <select
        className="p"
        onChange={(event) => setSelectedFilter(event.target.value)}
      >
        <option value="1">Movie</option>
        <option value="2">Actor</option>
        <option value="3">Genre</option>
      </select>

      <div>
        <label className="form"> Rent a Movie: </label>
        <input
          type="text"
          className="searchBar"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(event) => setCustomerId(event.target.value)}
        />
        <input
          type="text"
          className="searchBar"
          placeholder="Enter Movie ID"
          value={filmId}
          onChange={(event) => setFilmId(event.target.value)}
        />
        <button className="btn" onClick={rentMovie}>
          Rent
        </button>
      </div>
      {movieList
        .filter((val) => {
          if (searchTerm == "") {
            return val;
          } else {
            if (selectedFilter === "1") {
              return val.title.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (selectedFilter === "2") {
              return val.actor_names
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            } else if (selectedFilter === "3") {
              return val.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
          }
        })
        .map((val, key) => {
          return (
            <div className="listm" key={key}>
              <details>
                <summary key={key}>
                  {val.title} - ({val.film_id})
                </summary>
                <div>
                  <div className="stat">Description:</div> {val.description}
                </div>
                <div>
                  <div className="stat">Genre:</div>
                  {val.name}
                </div>
                <div>
                  <div className="stat">Release Date:</div>
                  {val.release_year}
                </div>
                <div>
                  <div className="stat">Length:</div> {val.length} Minutes
                </div>
                <div>
                  <div className="stat">Rating:</div> {val.rating}
                </div>
                <div>
                  <div className="stat">Rental Rate:</div> ${val.rental_rate}
                </div>
                <div>
                  <div className="stat">Replacement Cost:</div> $
                  {val.replacement_cost}
                </div>
                <div>
                  <div className="stat">Special Features:</div>
                  {val.special_features}
                </div>
                <div>
                  <div className="stat">Actors:</div>
                  {val.actor_names}
                </div>
              </details>
            </div>
          );
        })}
    </div>
  );
}
