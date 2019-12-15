const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
// const db = require('../../database/queryHelper');

const router = express.Router();

require('custom-env').env();

const { createAccessToken, createRefreshToken } = require('../../authentication/tokens');

const pool = new Pool({
  connectionString: process.env.connectionString,
});

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { username, email, password } = req.body;
  console.log('Register');
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  pool.connect((err, client, done) => {
    const { username, email, password } = req.body;
    if (err) {
      console.error('Database connection failed', err);
    } else {
      // check if email already used

      client.query('SELECT * FROM users WHERE username=$1 OR email = $2', [username, email],
        (error, result) => {
          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }
          console.log('One', result.rows);
          if (result.rows.length === 0) {
            // bcrypt.genSalt(10, (errr, salt) => {
            bcrypt.hash(password, 10, (erro, hash) => {
              // console.log('Hash in register is ', salt);
              if (erro) throw erro;
              client.query('INSERT INTO users (username, email, password, date) VALUES ($1, $2, $3, $4)',
                [username, email, hash, Date.now()], async (err2, reslt) => {
                  if (error) {
                    console.error('Error in connection inserting ', err2);
                    return res.status(400).send(err2);
                  }

                  // await client.query('SELECT * FROM users WHERE username=$1', [username],
                  //   async (error, result) => {
                  //     let pass = result.rows[0].password;
                  //     console.log('Username ', username.result.rows[0].username, username.result.rows[0].username.length);
                  //     bcrypt.compare(password, pass.trim(), (err, ress) => {
                  //       console.log('Hash ', hash, typeof hash);
                  //       console.log('Pass ', pass.charAt(61), typeof pass.charAt(61));
                  //       console.log('Password retrieved ', result.rows[0].password, typeof result.rows[0].password);
                  //       console.log('Equal ', hash === result.rows[0].password.trim());
                  //       console.log('After compare ', ress, err);
                  //     });
                  //   });
                  // console.log('Success ', hash, typeof hash);
                  // console.log('Compare ', hash === result.rows[0].password);
                  return res.status(200).send(reslt);
                });
            });
            // });
          }
        });
    }
  });
});

router.post('/login', (req, res) => {
  console.log('Req.body is ', req.body);
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  const { username, password } = req.body;
  // Check validation
  if (!isValid) {
    console.log('Is not valid');
    return res.status(400).json(errors);
  }
  
  // Find user by email
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Database connection failed', err);
    } else {
      console.log('Username', username);
      // check the username first
      client.query('SELECT * FROM users WHERE username=$1', [username],
        async (error, result) => {
          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }

          console.log('Username ', username);
          if (!result.rows.length) {
            console.log('User not found');
            return res.status(404).json({ usernotfound: 'User not found' });
          }
          // Check password
          await bcrypt.compare(password, result.rows[0].password.trim()).then((isMatch) => {
            if (isMatch) {
              console.log('Is match', isMatch);
              // User matched
              // Create JWT Payload
              const payload = {
                id: result.rows[0].id,
                name: result.rows[0].name,
              };
              const accessToken = createAccessToken(username);
              const refreshToken = createRefreshToken(username);
              // Save the refresh token in the database
              
            } else {
              console.log('Is not match', isMatch);
              return res
                .status(400)
                .json({ passwordincorrect: 'Password incorrect' });
            }
          });
        });
    }
  });
});

module.exports = router;
