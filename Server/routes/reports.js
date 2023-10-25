const db = require("../db");

function reports(callback) {
  const sql =
    "SELECT * FROM rental INNER JOIN customer ON customer.customer_id = rental.customer_id INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id INNER JOIN film ON inventory.film_id = film.film_id ORDER BY rental.rental_date DESC LIMIT 100;";
  db.query(sql, (err, result) => {
    if (err) callback({ message: "Server error" }, null);
    else callback(null, result);
  });
}

module.exports = {
  reports
};
