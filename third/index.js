import mysql2 from "mysql2";

const conction = mysql2.createConnection(
  //establish connection to the database that have in my local michine
  {
    host: "localhost",
    database: "new_schema",
    user: "root",
    password: "0000",
  }
);
//given list of customers
const customers = [
  {
    email: "anurag11@yopmail.com",
    name: "anurag",
  },
  {
    email: "sameer11@yopmail.com",
    name: "sameer",
  },
  {
    email: "ravi11@yopmail.com",
    name: "ravi",
  },
  {
    email: "akash11@yopmail.com",
    name: "akash",
  },
  {
    email: "anjali11@yopmail.com",
    name: "anjai",
  },
  {
    email: "santosh11@yopmail.com",
    name: "santo",
  },
  
];

//createing a function for updatinf database
const updatelist = (coustomer) => {
  coustomer.forEach((item) => {         //iterating through all items and checking different conditions
    const { email, name } = item;
    conction.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {  //condition for email exicting and updating names
            conction.query(
              `UPDATE users SET name = '${name}' WHERE email = '${email}'`,
              (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Updated name");
                }
              }
            );
          } else {          //condition if email is not exsiting in data base and inserting the values
            conction.query(
              `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`,
              (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Inserted customer");
                }
              }
            );
          }
        }
      }
    );
  });
};

conction.connect((err) => { 
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
  } else {
    console.log("Connected to MySQL database.");
    updatelist(customers);
  }
});



