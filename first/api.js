import mysql2 from "mysql2";
import express from "express";
import bodyParser from 'body-parser'
const conction = mysql2.createConnection(
  //establish connection to the database that have in my local michine
  {
    host: "localhost",
    database: "customer",
    user: "root",
    password: "0000",
  }
);
const app = express(); //initializeing express instance
const port = 3000; //default port
app.use(bodyParser.json());
app.listen(port, () => {
  console.log("listening on port 3000");
  conction.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL database: ", err);
    } else {
      console.log("Connected to MySQL database.");
    }
  });
});

app.post("/", (req, res) => {
  //post request to the path '/' where user request name and phone number
  const { name, phonenumber } = req.body;

  if (name.length <= 0 || phonenumber.length <= 0) {
    //check phone number and name is not empty
    return res
      .status(400)
      .send({ error: "Name and phoneNumber are required." });
  }

  conction.query(
    "SELECT * FROM customers WHERE phoneNumber = ?",
    [phonenumber],
    (err, results) => {
      //getting user details from database
      if (err) {
        console.error("Error checking for duplicates: ", err); //if there is any error in the database connection we will log out and send respond of 500
        return res
          .status(500)
          .send({ error: "An internal server error occurred." });
      }

      if (results.length > 0) {
        return res.status(400).send({ error: "Phone number already exists." }); //if we get any data from database then the phone number is exicts
      }

      conction.query(
        "INSERT INTO customers (name, phoneNumber) VALUES (?, ?)",
        [name, phonenumber],
        (err, result) => {
          //if not just adding the phone number and name
          if (err) {
            console.error("Error adding customer: ", err);
            return res
              .status(500)
              .send({ error: "An internal server error occurred." });
          }

          return res
            .status(200)
            .send({ message: "Customer added successfully." });
        }
      );
    }
  );
});
