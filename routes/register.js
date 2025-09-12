const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const { pool } = require("../database/dbConfig");

router.get('/', async(req, res) => {
    // res.render("register");
     res.json({status: 'success', data: req.body});
      // res.json([{ id: 1, name: 'John Doe' }]);
});

router.post('/', async(req, res) => {
    let { name, email, password, confirmpassword } = req.body;
      console.log({
    name,
    email,
    password,
    confirmpassword,
   
  });
  
  let errors = [];
  if (!name || !email || !password ) {
    errors.push({ message: "Please fill in all fields" });
  }
    if (password.length < 6) {
    errors.push({
      message: "Password should be at least 6 characters and contain symbols",
    });
  }
    if (password != confirmpassword) {
    // errors.push({ message: "Passwords do not match" });
   errors.push({ message: "Passwords do not match" });
  }
  if (errors.length > 0) {
    // res.status(400).render("register", { errors });
    return res.status(400).json({ errors });
  } else {
        let hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    pool.query(
        `SELECT * FROM patient WHERE email = $1`,
        [email],
      (err, results) => {
           if (err) {
          // throw err;
          return res.status(500).json({ error: "Database error" });
      }
        console.log(results.rows);

        if (results.rows.length > 0) {
             errors.push({ message: "Email already registered" });
          // res.render("register", { errors });
        } else {
                pool.query(
                    `INSERT INTO patient (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id,name,email`,
                    [name, email, hashedPassword],
                       (err, results) => {
                    if (err) {
                        // throw err;
                        return res.status(500).json({ error: "Database error" });
              }
              
              console.log(results.rows);
              return res.status(201).json({ status: "ok", user: results.rows[0] });
              
            }
                )
        }
    }
    )
  }
});

module.exports = router;