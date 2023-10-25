const db = require("../db");

function top5Films(callback) {
  const sql =
    "SELECT title, COUNT(film.film_id) AS rented, description,release_year,length,rating,rental_rate,special_features FROM ((rental INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id) INNER JOIN film ON inventory.film_id = film.film_id) GROUP BY title,description,release_year,length,rating,rental_rate,special_features ORDER BY Rented DESC LIMIT 5;";
  db.query(sql, (err, result) => {
    if (err) callback({ message: "Server error" }, null);
    else callback(null, result);
  });
}

function movielist(callback) {
  const sql =
    "SELECT film.film_id, film.title,category.name,film.description,film.rental_rate,film.release_year,film.replacement_cost,film.length,film.special_features,film.rating, GROUP_CONCAT(' ', actor.first_name, ' ', actor.last_name) AS actor_names FROM film INNER JOIN film_category ON film.film_id = film_category.film_id INNER JOIN category ON film_category.category_id = category.category_id INNER JOIN film_actor ON film.film_id = film_actor.film_id INNER JOIN actor ON film_actor.actor_id = actor.actor_id GROUP BY film.film_id, film.title,category.name;";
  db.query(sql, (err, result) => {
    if (err) callback({ message: "Server error" }, null);
    else callback(null, result);
  });
}

function rentMovie(customerId, filmId, callback) {
  const findInventorySQL = `
    SELECT inventory_id
    FROM inventory
    WHERE film_id = ?;
  `;

  db.query(findInventorySQL, [filmId], (err, result) => {
    if (err) {
      callback({ message: "Error finding inventory" }, null);
    } else {
      if (result.length === 0) {
        callback({ message: "Movie not found in inventory" }, null);
      } else {
        const inventoryId = result[0].inventory_id;

        const rentMovieSQL = `
          INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id)
          VALUES (CURRENT_TIMESTAMP, ?, ?, NULL, 1);
        `;

        db.query(
          rentMovieSQL,
          [inventoryId, customerId],
          (err, result) => {
            if (err) {
              callback({ message: "Error renting movie" }, null);
            } else {
              callback(null, { message: "Movie rented successfully" });
            }
          }
        );
      }
    }
  });
}


module.exports = {
  top5Films,
  movielist,
  rentMovie
};
