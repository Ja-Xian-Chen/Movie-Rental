const db = require("../db");

function top5Actors(callback) {
  const sql =
    "SELECT actor.actor_id, actor.first_name, actor.last_name, COUNT(film_actor.film_id) AS movies FROM (actor INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id) GROUP BY actor_id ORDER BY movies DESC LIMIT 5;";
  db.query(sql, (err, result) => {
    if (err) callback({ message: "Server error" }, null);
    else callback(null, result);
  });
}

function ActorTop5(actorId, callback) {
const sql = `
  SELECT film.title, COUNT(rental.rental_id) AS rented_count, CONCAT(actor.first_name, ' ', actor.last_name) as actor_name 
  FROM rental 
  INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id 
  INNER JOIN film ON inventory.film_id = film.film_id 
  INNER JOIN film_actor ON film.film_id = film_actor.film_id 
  INNER JOIN actor ON film_actor.actor_id = actor.actor_id 
  WHERE actor.actor_id = ?
  GROUP BY actor.first_name, actor.last_name, film.title, film.description, film.release_year, film.length, film.rating, film.rental_rate, film.special_features 
  ORDER BY rented_count DESC 
  LIMIT 5;
`;

  db.query(sql, [actorId], (err, result) => {
    if (err) {
      callback({ message: "Server error" }, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  top5Actors,
  ActorTop5,
};
