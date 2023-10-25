const db = require("../db");

function customerlist(callback) {
  const sql = "SELECT * FROM customer ORDER BY first_name";
  db.query(sql, (err, result) => {
    if (err) callback({ message: "Server error" }, null);
    else callback(null, result);
  });
}

function addCustomer(firstName, lastName, email, callback) {
  const sql =
    "INSERT INTO customer (first_name, last_name, email, store_id, address_id) VALUES (?,?,?,1,1)";

  db.query(sql, [firstName, lastName, email], (err, result) => {
    if (err) {
      callback({ message: "Server error" }, null);
    } else {
      callback(null, "Customer added successfully");
    }
  });
}

function deleteCustomer(id, callback) {
  const sql = "DELETE FROM customer WHERE customer_id = ?";

  db.query(sql, id, (err, result) => {
    if (err) {
      callback({ message: "Server error" }, null);
    } else {
      callback(null, "Customer deleted successfully");
    }
  });
}

function movieRented(customerId, callback) {
  const sql = `
  SELECT *, DATE_FORMAT(return_date, '%Y-%m-%d') as date_returned, DATE_FORMAT(rental_date, '%Y-%m-%d') as date_rented
  FROM rental
  INNER JOIN customer ON customer.customer_id = rental.customer_id
  INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
  INNER JOIN film ON inventory.film_id = film.film_id
  WHERE return_date is NULL and rental.customer_id = ?
  GROUP BY 
    rental.rental_id, rental.rental_date, rental.return_date, 
    customer.first_name, customer.last_name, customer.email, rental.customer_id;
`;

  db.query(sql, [customerId], (err, result) => {
    if (err) {
      callback({ message: "Server error" }, null);
    } else {
      callback(null, result);
    }
  });
}

function movieReturned(customerId, callback) {
  const sql = `
  SELECT *, DATE_FORMAT(return_date, '%Y-%m-%d') as date_returned, DATE_FORMAT(rental_date, '%Y-%m-%d') as date_rented

  FROM rental
  INNER JOIN customer ON customer.customer_id = rental.customer_id
  INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
  INNER JOIN film ON inventory.film_id = film.film_id
  WHERE return_date is not NULL and rental.customer_id = ?
  GROUP BY 
    rental.rental_id, rental.rental_date, rental.return_date, 
    customer.first_name, customer.last_name, customer.email, rental.customer_id;
`;

  db.query(sql, [customerId], (err, result) => {
    if (err) {
      callback({ message: "Server error" }, null);
    } else {
      callback(null, result);
    }
  });
}


function editCustomer(customerId, firstName, lastName, email, callback) {
  const sql =
    "UPDATE customer SET first_name=?, last_name=?, email=? WHERE customer_id=?";

  db.query(sql, [firstName, lastName, email, customerId], (err, result) => {
    if (err) {
      callback({ message: "Server error" }, null);
    } else {
      callback(null, "Customer updated successfully");
    }
  });
}

module.exports = {
  customerlist, addCustomer, deleteCustomer, editCustomer,movieRented,movieReturned
}