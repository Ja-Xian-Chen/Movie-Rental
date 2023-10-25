const express = require("express");
const app = express();
const cors = require("cors");

const moviesService = require("./routes/movies");
const customerServices = require("./routes/customers");
const actorServices = require("./routes/actors");
const reportServices = require("./routes/reports");

app.use(cors());
app.use(express.json());

//reports
app.get("/reports", (req, res) => {
  reportServices.reports((err, result) => {
    if (err) res.json(err);
    else res.send(result);
  });
});

//home page
app.get("/moviestop", (req, res) => {
  moviesService.top5Films((err, result) => {
    if (err) res.json(err);
    else res.send(result);
  });
});

app.get("/actors", (req, res) => {
  actorServices.top5Actors((err, result) => {
    if (err) res.json(err);
    else res.send(result);
  });
});

app.get("/actor/:actorId/topmovies", (req, res) => {
  const actorId = req.params.actorId;
  actorServices.ActorTop5(actorId, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      res.send(result);
    }
  });
});

//movies page
app.get("/movies", (req, res) => {
  moviesService.movielist((err, result) => {
    if (err) res.json(err);
    else res.send(result);
  });
});

app.post("/movielist/:customerId/:film_id", (req, res) => {
  const customerId = req.params.customerId;
  const filmId = req.params.film_id;

  moviesService.rentMovie(customerId, filmId, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(result);
    }
  });
});


//customers page
app.get("/customers", (req, res) => {
  customerServices.customerlist((err, result) => {
    if (err) res.json(err);
    else res.send(result);
  });
});

app.post("/create", (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;

  customerServices.addCustomer(firstName, lastName, email, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;

  customerServices.editCustomer(
    id,
    firstName,
    lastName,
    email,
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  customerServices.deleteCustomer(id, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/customer/:customerId/rented", (req, res) => {
  const customerId = req.params.customerId;
  customerServices.movieRented(customerId, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      res.send(result);
    }
  });
});

app.get("/customer/:customerId/returned", (req, res) => {
  const customerId = req.params.customerId;
  customerServices.movieReturned(customerId, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});


