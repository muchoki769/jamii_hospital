const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const { pool } = require("../database/dbConfig");

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new patient
 *     description: Creates a new patient account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmpassword 
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the patient
 *                 example: yohana
 *               email:
 *                 type: string
 *                 description: Email address of the patient
 *                 example: yohana@example.com
 *               password:
 *                 type: string
 *                 description: Password for account
 *                 example: StrongPassword123
 *               confirmpassword:
 *                 type: string
 *                 description: Confirm Password
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Patient registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     patient_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: yohana
 *                     email:
 *                       type: string
 *                       example: yohana@example.com
 *       400:
 *         description: Bad request - Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Email already registered", "Passwords do not match"]
 *       500:
 *         description: Internal server error
 */

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
          // return res.status(500).json({ error: "Database error" });
          console.error('Database query error:', err); 
          return res.status(500).json({error: "Database error",details: err.message});
      }
        console.log(results.rows);

        if (results.rows.length > 0) {
             errors.push({ message: "Email already registered" });
          // res.render("register", { errors });
        } else {
                pool.query(
                    `INSERT INTO patient (name, email, password_hash) VALUES ($1, $2, $3) RETURNING patient_id,name,email`,
                    [name, email, hashedPassword],
                       (err, results) => {
                    if (err) {
                        // throw err;
                        // return res.status(500).json({ error: "Database error" });
                        console.error('Database query error:', err); 
                        return res.status(500).json({error: "Database error",details: err.message});
              }
              
              console.log('Insert succesful:',results.rows);
              return res.status(201).json({ status: "ok", user: results.rows[0] });
              
            }
                )
        }
    }
    )
  }
});

module.exports = router;