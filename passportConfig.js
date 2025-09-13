const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./database/dbConfig");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    pool.query(
      `SELECT * FROM patient WHERE email = $1`,
      [email],
      (err, results) => {
          if (err) {
          // throw err;
                 console.error('Database query error for login:', err); 
          return res.status(500).json({error: "Database error for login",details: err.message});
        }
        console.log(results.rows);

         if (results.rows.length > 0) {
            const user = results.rows[0];

            bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                  if (err) {
              // throw err;
              console.error('Database query error for login:', err); 
          return res.status(500).json({error: "Database error for login",details: err.message});
            }
               if (isMatch) {
              return done(null, user);
            } else {
                return done(null, false, { message: "Password is not correct" });
            }
            });
         } else {
            return done(null, false, { message: "Email is not registered" });
         }
      }
    );
  };


  passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.patient_id)); 

    passport.deserializeUser((id, done) => {
         pool.query(`SELECT * FROM patient WHERE patient_id=$1`, [id], (err, results) => {
             if (err) {
                // throw err;
                       console.error('Database query error for login:', err); 
          return res.status(500).json({error: "Database error for login",details: err.message});
            }
            return done(null, results.rows[0]);
         })
    })
}
module.exports = initialize;