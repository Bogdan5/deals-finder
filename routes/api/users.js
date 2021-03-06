const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
// const db = require('../../database/queryHelper');

const router = express.Router();

require('custom-env').env();

const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('../../authentication/tokens');

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
        (err1, result) => {
          if (err1) {
            console.error('Error in connection selecting ', err1);
            return res.status(400).send(err1);
          }
          console.log('One', result.rows);
          if (result.rows.length === 0) {
            bcrypt.hash(password, 10, (err2, hash) => {
              if (err2) throw err2;
              client.query('INSERT INTO users (username, email, password, date) VALUES ($1, $2, $3, $4)',
                [username, email, hash, Date.now()], async (err3, result1) => {
                  if (err3) {
                    console.error('Error in connection inserting ', err3);
                    return res.status(400).send(err3);
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
          const user = result.rows[0];
          // Check password
          await bcrypt.compare(password, user.password.trim()).then((isMatch) => {
            if (isMatch) {
              console.log('Is match', isMatch);
              
              const accessToken = createAccessToken(user.user_id);
              const refreshToken = createRefreshToken(user.user_id);
              // Save the refresh token in the database



              // Send the access and the refresh token to the client
              sendAccessToken(req, res, accessToken);
              sendRefreshToken(res, refreshToken);

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

router.post('/logout', (res, res) => {
  res.clearCookie('refreshToken', { path: '/refresh_token' });
  return res.send({ message: 'Logged out!' });
});

//get a new accesstoken with a refresh token
router.post('/refresh_token', (req, res) => {
  const token = res.cookies.refreshToken;
  if (!token === null) return res.send({ accessToken: '' });
  let payload = null;
  try {
    payload = verify(token, process.env.refreshSecretOrKey);
  } catch(err) {
    res.send({ accessToken: '' });
  }

  // token is valid, so check if user exists in the database
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Database connection failed', err);
    } else {
      client.query('SELECT * FROM users WHERE username=$1', [payload.userId],
        async (error, result) => {
          if (error) {
            console.error('Error in connection selecting ', error);
            return res.status(400).send(err);
          }
          if (result.rows.length === 0) {
            const user = result.rows[0];
            return res.send({ accessToken: '' });            
          }
          // User exists, find if it has a refresh token
          if (user.refreshToken !== token) {
            return res.send({ accessToken: '' });
          }
          // Token exists, create new Access and Refresh token
          const accessToken = createAccessToken(user.user_id);
          const refreshToken = createRefreshToken(user.user_id);
          // Update the refreshtoken in the database
          client.query('UPDATE users SET reshresh_token=$1 WHERE user_id=$2', [refreshToken, user.user_id],
            (err, result) => {
              if (err) (err) => res.status(400).send(err);
            });
          sendRefreshToken(res, refreshToken);
          return res.send({ accessToken });
      });
    }
  });
});

module.exports = router;
