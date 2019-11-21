const express = require('express');
const { Pool } = require('pg');

const router = express.Router();


require('custom-env').env();

const pool = new Pool({
  connectionString: process.env.connectionString,
});

router.get('/', authenticate.verifyUser)
  .then((req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const tokenPayload =  jwt.verify(token, config.secretKey);
    pool.connect((err, client, done) => {
      if (err) {
        console.error('Database connection failed', err);
      } else {
        client.query()
      }
    })
  })
  .catch((err) => {
    console.log('Error ', err);

  })