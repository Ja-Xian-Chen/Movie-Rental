import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function Customers() {
  const [customerList, setCustomerList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("1");

  const [customerIdToDelete, setCustomerIdToDelete] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [editCustomerData, setEditCustomerData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const [customerRented, setCustomerMovies] = useState({});
  const [customerReturned, setCustomerReturns] = useState({});

  const getCustomersRented = (customerId) => {
    Axios.get(`http://localhost:3001/customer/${customerId}/rented`)
      .then((response) => {
        setCustomerMovies((prevState) => ({
          ...prevState,
          [customerId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching rented movies for customer:", error);
      });
  };

  const getCustomersReturned = (customerId) => {
    Axios.get(`http://localhost:3001/customer/${customerId}/returned`)
      .then((response) => {
        setCustomerReturns((prevState) => ({
          ...prevState,
          [customerId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching rented movies for customer:", error);
      });
  };

  const getCustomers = () => {
    Axios.get("http://localhost:3001/customers").then((response) => {
      setCustomerList(response.data);
    });
  };

  const addCustomer = () => {
    Axios.post("http://localhost:3001/create", newCustomer).then(() => {
      setCustomerList([...customerList, newCustomer]);
      setNewCustomer({
        first_name: "",
        last_name: "",
        email: "",
      });
    });
  };

  const deleteCustomer = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setCustomerList(customerList.filter((val) => val.id !== id));
    });
  };

  const updateCustomer = () => {
    const id = editCustomerData.id;
    Axios.put(`http://localhost:3001/edit/${id}`, editCustomerData)
      .then((response) => {
        if (response.status === 200) {
          const updatedCustomerList = customerList.map((customer) => {
            if (customer.id === id) {
              return {
                id,
                first_name: editCustomerData.first_name,
                last_name: editCustomerData.last_name,
                email: editCustomerData.email,
              };
            }
            return customer;
          });
          setCustomerList(updatedCustomerList);

          setEditCustomerData({
            id: "",
            first_name: "",
            last_name: "",
            email: "",
          });
        } else {
          console.error("Update failed. Handle error here.");
        }
      })
      .catch((error) => {
        console.error(
          "An error occurred while updating the customer data:",
          error
        );
      });
  };
  useEffect(() => {
    getCustomers();
  }, []);

    useEffect(() => {
      customerList.forEach((val) => {
        getCustomersRented(val.customer_id);
      });
    }, [customerList]);

    useEffect(() => {
      customerList.forEach((val) => {
        getCustomersReturned(val.customer_id);
      });
    }, [customerList]);

  return (
    <div className="container">
      <input
        className="searchBar"
        type="text"
        placeholder="Search Customers..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <select
        className="p"
        onChange={(event) => setSelectedFilter(event.target.value)}
      >
        <option value="1">First Name</option>
        <option value="2">Last Name</option>
        <option value="3">Email</option>
      </select>

      <div className="listn">
        <details>
          <summary>Add</summary>
          <div>
            <label className="form">First Name:</label>
            <input
              type="text"
              className="searchBar"
              value={newCustomer.first_name}
              onChange={(event) =>
                setNewCustomer({
                  ...newCustomer,
                  first_name: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="form">Last Name:</label>
            <input
              type="text"
              className="searchBar"
              value={newCustomer.last_name}
              onChange={(event) =>
                setNewCustomer({
                  ...newCustomer,
                  last_name: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="form">Email:</label>
            <input
              type="text"
              className="searchBar"
              value={newCustomer.email}
              onChange={(event) =>
                setNewCustomer({
                  ...newCustomer,
                  email: event.target.value,
                })
              }
            />
          </div>

          <button className="btn" onClick={addCustomer}>
            Submit
          </button>
        </details>
      </div>
      <div className="listn">
        <div>
          <details>
            <summary>Delete</summary>
            <label className="form">Remove Customer: </label>
            <input
              type="text"
              className="searchBar"
              placeholder="Enter Customer ID"
              value={customerIdToDelete}
              onChange={(event) => setCustomerIdToDelete(event.target.value)}
            />
            <button
              className="btn"
              onClick={() => deleteCustomer(customerIdToDelete)}
            >
              Remove
            </button>
          </details>
        </div>
      </div>
      <div className="listn">
        <div>
          <details>
            <summary>Edit</summary>
            <label className="form">Customer ID:</label>
            <input
              type="text"
              className="searchBar"
              value={editCustomerData.id}
              onChange={(event) =>
                setEditCustomerData({
                  ...editCustomerData,
                  id: event.target.value,
                })
              }
            />
            <label className="form">First Name:</label>
            <input
              type="text"
              className="searchBar"
              value={editCustomerData.first_name}
              onChange={(event) =>
                setEditCustomerData({
                  ...editCustomerData,
                  first_name: event.target.value,
                })
              }
            />
            <label className="form">Last Name:</label>
            <input
              type="text"
              className="searchBar"
              value={editCustomerData.last_name}
              onChange={(event) =>
                setEditCustomerData({
                  ...editCustomerData,
                  last_name: event.target.value,
                })
              }
            />
            <label className="form">Email:</label>
            <input
              type="text"
              className="searchBar"
              value={editCustomerData.email}
              onChange={(event) =>
                setEditCustomerData({
                  ...editCustomerData,
                  email: event.target.value,
                })
              }
            />
            <button className="btn" onClick={updateCustomer}>
              Update
            </button>
          </details>
        </div>
      </div>
      {customerList
        .filter((val) => {
          if (searchTerm == "") {
            return val;
          } else {
            if (selectedFilter === "1") {
              return val.first_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            } else if (selectedFilter === "2") {
              return val.last_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            } else if (selectedFilter === "3") {
              return val.email.toLowerCase().includes(searchTerm.toLowerCase());
            }
          }
        })
        .map((val, key) => {
          return (
            <div className="list" key={key}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      {val.first_name} {val.last_name}
                    </td>
                    <td id="email">
                      <details>
                        <summary>Movies Rented Out</summary>
                        <div>
                          {customerRented[val.customer_id] ? (
                            customerRented[val.customer_id].map((key) => (
                              <div key={key.id}>
                                "{key.title}" was rented on {key.date_rented}
                              </div>
                            ))
                          ) : (
                            <li>Loading...</li>
                          )}
                        </div>
                      </details>
                    </td>
                    <td id="email">
                      <details>
                        <summary>Movies Returned</summary>
                        <div>
                          {customerReturned[val.customer_id] ? (
                            customerReturned[val.customer_id].map((key) => (
                              <div key={key.id}>
                                "{key.title}" was rented on {key.date_rented} and returned on {key.date_returned}
                              </div>
                            ))
                          ) : (
                            <li>Loading...</li>
                          )}
                        </div>
                      </details>
                    </td>
                    <td id="emailp">
                      <details>
                        <summary>Show Details</summary>
                        <div>
                          <div className="stat">Email:</div>
                          {val.email}
                        </div>
                        <div>
                          <div className="stat">Customer Id:</div>
                          {val.customer_id}
                        </div>
                      </details>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
}
